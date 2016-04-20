// Unified Search

var initSearch = function() {
	if ($("[data-search]").length) {
		 var rawQuery = "";
		$("[data-search]").each(function(i) {
			debug.log('Search Start');

			var el = $(this),
				container = $(".search-container"),
				url = el.data("feed"),
				index = i,
				icon = el.find(".search-icon"),
				field = el.find("[data-lookup]"),
				input = el.find("input[data-lookup]"),
				select = el.find("select[data-lookup]"),
				outputArray = [],
				addTag = null,
				tagcloudElement = '<ul class="tagcloud"></ul>',
				tagclose = '<img class="svg icon icon-close" src="' + matter.config.application.base + 'img/icons/icon-close.svg">',
				resultsControlsElement = '<div class="search-controls"></div>',
				resultsCountElement = '<div class="search-count"></div>',
				resultsViewElement = '<div class="search-views">\
					<div class="search-view" data-view="grid"><img class="svg icon icon-grid" src="' + matter.config.application.base + 'img/icons/icon-grid.svg"></div>\
					<div class="search-view" data-view="list"><img class="svg icon icon-list" src="' + matter.config.application.base + 'img/icons/icon-list.svg"></div>\
				</div>',
				resultsPaginationElement = '<div class="search-pagination"></div>',
				resultsElement = '<div class="search-results ' + matter.config.search.mode + '" data-view="' + matter.config.search.view + '"></div>',
				loaderElement = '<div class="loader"><div class="loader-inner">&nbsp;</div></div>';
				loadElement = '<button class="primary search-load load-more">Load More</button>';

			if ( !$(".search-results").length ) container.append(resultsElement);
			var results = $(".search-results");
			var resultItems = [];
			var resultTemplate = el.data("template");

			$(tagcloudElement).insertBefore(results);
			$(resultsControlsElement).insertBefore(results);
			$(loaderElement).insertBefore(results);
			$(loadElement).insertAfter(container);

			var tagcloud = $(".tagcloud"),
				controls = $(".search-controls"),
				load = $(".search-load");

			controls.append(resultsCountElement);
			controls.append(resultsViewElement);

			var count = controls.find(".search-count");
			var views = controls.find(".search-views");

			matter.svg.init();


			// View change

			views.children(".search-view[data-view='" + matter.config.search.view + "']").addClass("active");
			views.on("click", ".search-view", function() {
				var el = $(this),
					view = el.data("view");

				el.addClass("active").siblings().removeClass("active");
				results.attr("data-view", view);
			});


			// Init

			var buildSystem = function(data) {
				var feed = data,
					parameterArray = [],
					resultArray = [];

				console.log(data);

				// Populate Dropdowns

				var populateSelects = function() {
					select.each(function() {
						var parameter = $(this).data("lookup");
						$(this).empty();

						var tempArray = [];
						outputArray[parameter] = [];
						resultArray[parameter] = [];

						for ( var i = 0; i < feed.length; i++ ) {
							var object = feed[i];
							var property = object[parameter];

							if ( property instanceof Array ) {
								for ( var k = 0; k < property.length; k++ ) {
									if ( $.inArray(property[k], tempArray) < 0 ) tempArray.push(property[k]);
								}
							} else {
								if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
							}
						}

						var placeholder = '<option value="" default selected>' + parameter.capitalize() + '</option>';
						$(this).append(placeholder);

						if (parameter !== "year") {
							tempArray.sort();
						} else {
							tempArray.sort().reverse();
						}

						for (var j = 0; j < tempArray.length; j++) {
							var text = tempArray[j];

							if (text && text !== "") {
								var value = text.friendly();
								var option = '<option value="' + value + '">' + text + '</option>';

								$(this).append(option);
							}
						}
					});
				}



				// Interactive Elements

				var inputInit = function() {
					var parameter = field.data("lookup");

					if ( !parameterArray.has(parameter) ) parameterArray.push(parameter);
					outputArray[parameter] = [];

					// Tags

					addTag = function addTag(parameter, content, value) {
						var tag = '<li class="tag" data-tag-parameter="' + parameter + '" data-tag-value="' + value + '" data-tag-content="' + content + '">' + content + tagclose + '</li>';

						if ( value !== "" ) {
							if ($.inArray(content, outputArray[parameter]) < 0) {
								if (parameter === "Year") {
									tagcloud.children(".tag[data-tag-parameter='" + parameter + "']").remove();
								}

								tagcloud.addClass("active").append(tag);
							} else {
								notify("Filter already active", "You have already selected this filter. Please choose another one.");
								return false;
							}
						}
						matter.svg.init();

						updateTags(parameter);
					}

					var clearTags = function(parameter) {
						tagcloud.children(".tag[data-tag-parameter='" + parameter + "']").remove();
						updateTags(parameter);
					}

					tagcloud.on("mouseup", ".tag", function() {
						var parameter = $(this).data("tag-parameter");
						$(this).remove();

						updateTags(parameter);
					});

					// Fields

					if ( field.length ) {
						field.each(function() {
							var type = $(this).prop("tagName");
							var parameter = $(this).data("lookup");

							if ( type == "INPUT" && $(this).attr("type") == "text" ) {
								// $(this).on("keyup", function(event) {
								// 	var value = $(this).val().toLowerCase();
								// 	var criteria = parameter.replace(/\s/g, "").split(",");
								// 	var keycode = event.keyCode;

								// 	debug.log('Input selection: ' + value);

								// 	var validKeys =
								// 		keycode == 32 || keycode === 13     ||  // spacebar & return key(s)
								// 		keycode == 8                        ||  // backspace
								// 		(keycode > 47 && keycode < 58)      ||  // number keys
								// 		(keycode > 64 && keycode < 91)      ||  // letter keys
								// 		(keycode > 95 && keycode < 112)     ||  // numpad keys
								// 		(keycode > 185 && keycode < 193)    ||  // ;=,-./` (in order)
								// 		(keycode > 218 && keycode < 223);       // [\]' (in order)

								// 	if ( validKeys ) {
								// 		if ( value.length <= 1 ) matter.text.unhighlight(results);
								// 		outputArray[parameter] = value;
								// 		updateResults();
								// 		return false;
								// 	}
								// });

								// $(this).on("keydown", function(event) {
								// 	if (event.keyCode == 13) {
								// 		event.preventDefault();
								// 		return false;
								// 	}
								// });

								$(this).on("keyup", function(event) {
									if (event.keyCode == 13) {
										var value = $(this).val().toLowerCase();
										var criteria = parameter.replace(/\s/g, "").split(",");
										var keycode = event.keyCode;

										debug.log('Input selection: ' + value);

										if ( value.length <= 1 ) matter.text.unhighlight(results);
										outputArray[parameter] = value;
										updateResults();
										return false;
									}
								});
							} else if ( type == "INPUT" && $(this).attr("type") == "checkbox" ) {
								if ( !parameterArray.has(parameter) ) parameterArray.push(parameter);
								outputArray[parameter] = [];

								$(this).on("change", function() {
									var content = $(this).val().capitalize();
									var value = $(this).val();

									debug.log('Checkbox selection: ' + value);
									debug.log(parameter, content, value);

									addTag(parameter, content, value);
								});
							} else if ( type == "INPUT" && $(this).attr("type") == "radio" ) {
								if ( !parameterArray.has(parameter) ) parameterArray.push(parameter);
								outputArray[parameter] = [];

								$(this).on("change", function() {
									var content = $(this).val().capitalize();
									var value = $(this).val();

									if ( value == "all" ) {
										clearTags(parameter);
									} else {
										clearTags(parameter);

										debug.log('Radio selection: ' + value);
										debug.log(parameter, content, value);

										addTag(parameter, content, value);
									}
								});
							} else if ( type == "SELECT" ) {
								var placeholder = $(this).val();

								populateSelects();

								if ( !parameterArray.has(parameter) ) parameterArray.push(parameter);
								outputArray[parameter] = [];

								$(this).on("change", function(event) {
									event.preventDefault();

									var content = $(this).children("option:selected").text(),
										value = $(this).children("option:selected").val();

									debug.log('Select selection: ' + value);

									debug.log(parameter, content, value);
									addTag(parameter, content, value);
								});
							}
						});
					}
				}

				var updateTags = function(parameter) {
					var target = tagcloud.children(".tag[data-tag-parameter='" + parameter + "']");

					$("select[data-lookup='" + parameter + "']").parents(".dropdown-wrapper").find(".dropdown-item").removeClass("active");

					var tempArray = [];

					for ( var n = 0; n < target.length; n++ ) {
						var value = target.eq(n).data("tag-content");
						tempArray.push(value);
					}

					outputArray[parameter] = tempArray;

					updateResults();
				}

				// Run

				inputInit();



				// Results Update functions

				var updateResults = function() {
					rawQuery = "";

					// Create all arrays for analysis and populate allArray with all items for comparison.

					var allArray = [];
					var resultArray = [];
					var existsArray = [];
					var totalArray = [];
					var finalArray = [];

					for ( var i = 0; i < feed.length; i++ ) {
						var object = feed[i],
							id = object.id;

						allArray.push(id);
					}
					for ( var j = 0; j < parameterArray.length; j++ ) {
						resultArray[parameterArray[j]] = [];
					}


					// Pagination and Selective loading

					container.addClass("loading");

					var currentPage = 1;


					// Get all values from all inputs/tags and rebuild arrays.

					// Input

					var inputAnalysis = function() {
						if ( input.length && input.val() !== "" ) {
							var parameter = input.data("lookup"),
								criteria = parameter.replace(/\s/g, "").split(","),
								tempArray = [];

							for ( var i = 0; i < feed.length; i++ ) {
								var object = feed[i],
									id = object.id,
									compare = outputArray[parameter];

								for ( var j = 0; j < criteria.length; j++ ) {
									var retrieved = object[criteria[j]];

									if ( retrieved instanceof Array ) {
										for ( var k = 0; k < retrieved.length; k++ ) {
											var analyseArray = retrieved[k].toLowerCase();

											if ( analyseArray.has(compare) && input.val() !== "" && !tempArray.has(id) ) {
												tempArray.push(id);
											}
										}
									} else {
										var analyseString = retrieved.toLowerCase();

										if ( analyseString.has(compare) && input.val() !== "" && !tempArray.has(id) ) {
											tempArray.push(id);
										}
									}
								}
							}

							resultArray[parameter] = tempArray;

							rawQuery += "?q=" + input.val();
						}
					}

					// Tags

					var tagAnalysis = function() {
						if ( tagcloud.children(".tag").length > 0 ) {
							tagcloud.addClass("active");

							for ( var n = 0; n < tagcloud.children(".tag").length; n++ ) {
								var parameter = tagcloud.children(".tag").eq(n).data("tag-parameter"),
									value = tagcloud.children(".tag").eq(n).data("tag-value"),
									content = tagcloud.children(".tag").eq(n).data("tag-content"),
									criteria = parameter,
									compare = outputArray[parameter],
									tempArray = [];

								for ( var i = 0; i < feed.length; i++ ) {
									var object = feed[i],
										id = object.id,
										analyse = object[criteria];

									if ( analyse instanceof Object ) {
										var joined = analyse.concat(compare);
										if ( joined.duplicates().length > 0 && !tempArray.has(id) ) {
											tempArray.push(id);
										}
									} else {
										if ( compare.has(analyse) && !tempArray.has(id) ) {
											tempArray.push(id);
										}
										else if (!isNaN(analyse) && analyse === compare.toString() && !tempArray.has(id)) {
											tempArray.push(id);
										}
									}
								}

								resultArray[parameter] = tempArray;

								var queryStart = rawQuery !== "" ? "&" : "?";
								rawQuery += queryStart + parameter + "=" + value;
							}
						} else {
							tagcloud.removeClass("active");
						}
					}

					// Run

					inputAnalysis();
					tagAnalysis();


					// Analyse rebuilt arrays and build final array

					for ( var k = 0; k < parameterArray.length; k++ ) {
						var outputSet = outputArray[parameterArray[k]],
							resultSet = resultArray[parameterArray[k]];

						existsArray.push(outputSet.length > 0);

						if ( outputSet.length > 0 ) {
							var joined = resultSet.concat(allArray).duplicates();
							totalArray.push(joined);
						}
					}

					var outputCount = 0;
					for ( var l = 0; l < existsArray.length; l++ ) {
						if ( existsArray[l] === true ) outputCount++;
					}
					var hasOutput = outputCount >= 1;

					var cleanArray = totalArray.reduce().sort();


					// Empty Final array, compare id repetition against number of inputs, rebuild finalArray.

					var countRepeated = function(arr) {
						var counts = {};
						for ( var i = 0; i < arr.length; i++ ) {
							var num = arr[i];
							counts[num] = counts[num] ? counts[num] + 1 : 1;
						}
						return counts;
					}

					var analysis = countRepeated(cleanArray);

					if ( hasOutput ) {
						for ( var m = 0; m < cleanArray.length; m++ ) {
							if ( analysis[cleanArray[m]] === outputCount && $.inArray(cleanArray[m], finalArray) < 0 ) {
								finalArray.push(cleanArray[m]);
							}
						}
					} else {
						finalArray = allArray;
					}

					debug.log("Search == " + finalArray.length + " items");


					// Rebuild results

					var firstLoad = true;
					var pagination;

					var rebuildSystem = function() {
						var buildTemplate = function(template) {
							var loadItems = function() {
								for ( var i = 0; i < feed.length; i++ ) {
									var object = feed[i];
									var id = object.id;

									if ( !finalArray.has(id) ) continue;

									// result = resultTemplate.html(); // $(".search-result-template") with {{VARs}}
									// wrapperClass = resultTemplate.data('wrapper-class');

									var result = template;

									// I can't believe someone has written this regex crap and can still sleep at night
									var handleIfRegex = /{{#if (\w+)}}(((?!{{#if \w+}}[\s\S]*?{{\/if}})[\s\S])*?){{\/if}}/g;

									while (result.search(handleIfRegex) !== -1) {
										result = result.replace(handleIfRegex, function(str, key, value) {
											return object[key] && object[key] ? value : '';
										});
									}

									result = result.replace(/{{(\w+)}}/g, function(str, key) {
										return object[key] ? object[key] : '';
									});

									if ( !resultItems.has(result) ) resultItems.push(result);
								}


								// Highlight

								if ( input.length ) {
									input.each(function() {
										var value = $(this).val().toLowerCase(),
											parameter = $(this).data("lookup"),
											criteria = parameter.replace(/\s/g, "").split(",");

										if ( value.length > 1 ) {
											for ( var i = 0; i < criteria.length; i++ ) {
												var target = results.find("[class='" + criteria[i].toLowerCase() + "']");
												matter.text.highlight(target, value);
											}
										}
									});
								}


								// Pagination

								if ( matter.config.search.pagination ) {
									container.append(resultsPaginationElement).prepend(resultsPaginationElement);
									firstLoad = false;
								}
							}

							if ( firstLoad ) loadItems();


							// Post build

							var showItem = function(i) {
								var item = $(resultItems[i]);

								if ( i < (matter.config.search.display  * currentPage) ) {
									if ( matter.config.search.pagination ) {
										item.appendTo(results);
										setTimeout(function() {
											item.removeClass("loading");
										}, 250);
									} else {
										item.appendTo(results);
										setTimeout(function() {
											item.removeClass("loading");
										}, 250 + (100 * (i % matter.config.search.display)));
									}
								}
							}

							var items = results.children(".item");
							var resultsCount = resultItems.length;

							count
								.css({"display": "inline-block"})
								.html((resultsCount === 0 ? "No" : resultsCount) + " result" + (resultsCount === 1 ? " " : "s ") + "found");

							container.removeClass("loading");
							results.removeClass("no-results");

							if (resultsCount) {
								results.removeClass("no-results");

								if ( matter.config.search.pagination ) items.addClass("loading");

								for ( var i = (matter.config.search.display  * (currentPage - 1)), j = 0; i < resultsCount && j < matter.config.search.display; i++, j++ ) {
									showItem(i);
								}
							} else {
								results.addClass("no-results");
							}


							// Pagination and Selective loading


							if ( matter.config.search.pagination ) {
								pagination = $(".search-pagination");

								if ( resultsCount > matter.config.search.display ) {
									pagination.show();
								} else {
									pagination.hide();
								}
							} else {
								if ( resultsCount > matter.config.search.display * currentPage ) {
									load.show();
								} else {
									load.hide();
								}
							}
						}

						matter.data.get(resultTemplate, buildTemplate);
					}

					results.html("");
					resultItems.length = 0;
					rebuildSystem();


					// Pagination and Selective loading

					var items = results.children(".item");
					var resultsCount = resultItems.length; // items.length;

					if ( matter.config.search.pagination ) {
						var pages = 0;

						for ( var n = 0; n < resultsCount; n++ ) {
							if ( n % matter.config.search.display === 0 ) {
								pages++;

								var page = "<button data-page='" + pages + "'>" + pages + "</button>";
								pagination.append(page);
							}
						}

						$("[data-page='" + currentPage + "']").addClass("primary");

						$("[data-page]").off().on("click", function() {
							currentPage = $(this).data("page");

							$("[data-page]").removeClass("primary");
							$("[data-page='" + currentPage + "']").addClass("primary");

							$("html, body").animate({
								scrollTop: $(".search-wrapper").offset().top - 90
							}, {
								duration: 1000,
								queue: false,
								complete: function() {
									matter.anchor.clicked = false;
								}
							});

							rebuildSystem();
						});
					} else {
						load.off().on("click", function(e) {
							e.preventDefault();
							currentPage++;
							rebuildSystem();
						});
					}
				}



				// Initialise

				initDropdowns();
				inputInit();
				updateResults();



				// Query String Auto selecting

				var queryObj = matter.query.get(window.location.href);

				for ( var prop in queryObj ) {
					if( queryObj.hasOwnProperty(prop) ) {
						var assignedDrop = prop;
						var assignedVal = queryObj[prop];
						var assignedContent;

						if ( assignedDrop == "q" ) {
							input.val(decodeURIComponent(assignedVal));
						} else {
							if ( assignedVal instanceof Array ) {
								for (var i = 0; i < assignedVal.length; i++) {
									assignedContent = decodeURIComponent(assignedVal[i]).replace(/-/g, " ").toCamelCase();
									addTag(assignedDrop, assignedContent, decodeURIComponent(assignedVal[i]));
								}
							} else {
								assignedContent = decodeURIComponent(assignedVal).replace(/-/g, " ").toCamelCase();
								addTag(assignedDrop, assignedContent,decodeURIComponent( assignedVal));
							}
						}
					}
				}
			}

			matter.data.get(url, buildSystem);
		});

		window.onbeforeunload = function() {
			var url = (window.location.href).split("?")[0] + rawQuery;
			history.pushState(null, null, url);
		}

		debug.log("Search :: Unified Search");
	}
}
