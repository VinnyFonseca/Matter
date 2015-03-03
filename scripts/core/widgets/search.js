// Unified Search

function initSearch() {
	if ( $("[data-search]").length ) {
		$("[data-search]").each(function(i) {
			var el = $(this),
				url = el.data("search"),
				index = i,
				icon = el.find(".search-icon"),
				input = el.find("input[data-search-parameter]"),
				select = el.find("select[data-search-parameter]"),
				outputArray = [],

				tagcloudElement = '<ul class="tagcloud"></ul>',
				tagclose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">',

				resultsControlsElement = '<div class="search-controls"></div>',
				resultsCountElement = '<div class="search-count"></div>',
				resultsViewsElement =  '<div class="search-views">\
											<div class="search-view" data-view="grid">\
												<img class="svg icon icon-grid" src="img/icons/icon-grid.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-grid.png\'">\
											</div>\
											<div class="search-view" data-view="list">\
												<img class="svg icon icon-list" src="img/icons/icon-list.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-list.png\'">\
											</div>\
										</div>',

				resultsPaginationElement = '<div class="search-pagination"></div>',
				resultsElement = '<div class="search-results loading ' + config.search.display + '" data-view="' + config.search.view + '"></div>',
				loadElement = '<button class="primary center search-load">Load More</button>';

			el.append(tagcloudElement)
			  .append(resultsControlsElement)
			  .append(resultsElement)
			  .append(loadElement);

			var tagcloud = el.find(".tagcloud"),
				controls = el.find(".search-controls"),
				results = el.find(".search-results")
				load = el.find(".search-load");

			controls
				.append(resultsViewsElement)
				.append(resultsCountElement);

			var views = controls.find(".search-views"),
				count = controls.find(".search-count");

			initSVGs();


			// View change

			views.children(".search-view[data-view='" + config.search.view + "']").addClass("active");
			views.on("click", ".search-view", function() {
				var el = $(this),
					view = el.data("view");

				el.addClass("active").siblings().removeClass("active");
				results.attr("data-view", view);
			});


			// Init

			dataRequest(url, "GET", build);

			function build(data) {
				var JSONobjects = data.Results,
					parameterArray = [],
					resultArray = [];



				// Populate Dropdowns

				function populateSelects(parameter) {
					var target = el.find("select[data-search-parameter='" + parameter + "']");

					var tempArray = [];
					outputArray[parameter] = [];
					resultArray[parameter] = [];

					for ( var i = 0; i < JSONobjects.length; i++ ) {
						var object = JSONobjects[i];
						var property = object[parameter];

						if ( property instanceof Array ) {
							for ( var k = 0; k < property.length; k++ ) {
								if ( $.inArray(property[k], tempArray) < 0 ) tempArray.push(property[k]);
							}
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}

					var placeholder = '<option class="placeholder">Select ' + parameter + '...</option>';
					target.append(placeholder);

					tempArray.sort();

					for ( var i = 0; i < tempArray.length; i++ ) {
						var option = '<option value="' + tempArray[i] + '">' + tempArray[i] + '</option>';
						target.append(option);
					}
				}



				// Interactive Elements

				function inputInit() {
					var parameter = input.data("search-parameter");

					parameterArray.push(parameter);
					outputArray[parameter] = [];

					input.on("keyup", function(event) {
						var value = $(this).val();
							parameter = $(this).data("search-parameter"),
							keycode = event.keyCode;

							var validKeys =
							keycode == 32 || keycode === 13		||  // spacebar & return key(s)
							keycode == 8						||  // backspace
							(keycode > 47 && keycode < 58)		||  // number keys
							(keycode > 64 && keycode < 91)		||  // letter keys
							(keycode > 95 && keycode < 112)		||  // numpad keys
							(keycode > 185 && keycode < 193)	||  // ;=,-./` (in order)
							(keycode > 218 && keycode < 223);		// [\]' (in order)

						if ( value !== "" && validKeys ) {
							outputArray[parameter] = value.toLowerCase();

							updateResults();
							return false;
						}
					});


					// Selects

					select.each(function(i) {
						var placeholder = $(this).val(),
							parameter = $(this).data("search-parameter");

						populateSelects(parameter);

						parameterArray.push(parameter);
						outputArray[parameter] = [];

						$(this).on("change", function(event) {
							event.preventDefault();

							var value = $(this).val(),
								tag = '<li class="tag" data-tag-group="' + i + '" data-tag-parameter="' + parameter + '" data-tag="' + value + '">' + value + tagclose + '</li>';

							if ( value !== "" ) {
								if ( $.inArray(value, outputArray[parameter]) < 0 ) {
									tagcloud.addClass("active").append(tag);
								} else {
									notify("This tag already exists.", "failure");
									return false;
								}
							}

							updateTags(parameter);
							initSVGs();
						});
					});

					initDropdowns();


					// Tags

					tagcloud.on("click", ".tag", function() {
						var parameter = $(this).data("tag-parameter");

						$(this).remove();
						tagcloud.children(".tag").length > 0 ? tagcloud.addClass("active") : tagcloud.removeClass("active");

						updateTags(parameter);
					});
				}

				function updateTags(parameter) {
					var target = tagcloud.children(".tag[data-tag-parameter='" + parameter + "']");

					var tempArray = [];

					for ( var n = 0; n < target.length; n++ ) {
						var value = target.eq(n).data("tag");
						tempArray.push(value);
					}

					outputArray[parameter] = tempArray;

					updateResults();
				}

				// Run

				inputInit();



				// Results Update functions

				function updateResults() {

					// Create all arrays for analysis and populate allArray with all items for comparison.

					var allArray = [];
					var resultArray = [];
					var existsArray = [];
					var totalArray = [];
					var finalArray = [];

					for ( var i = 0; i < JSONobjects.length; i++ ) {
						var object = JSONobjects[i],
							id = object.Id;

						allArray.push(id);
					}
					for ( var i = 0; i < parameterArray.length; i++ ) {
						resultArray[parameterArray[i]] = [];
					}


					// Pagination and Selective loading

					var currentPage = 1;


					// Get all values from all inputs/tags and rebuild arrays.

					// Input

					function inputAnalysis() {
						var parameter = input.data("search-parameter"),
							criteria = parameter.replace(/\s/g, "").split(","),
							tempArray = [];

						for ( var i = 0; i < JSONobjects.length; i++ ) {
							var object = JSONobjects[i],
								id = object.Id,
								compare = outputArray[parameter];

							for ( var j = 0; j < criteria.length; j++ ) {
								var retrieved = object[criteria[j]];

								if ( retrieved instanceof Array ) {
									for ( var k = 0; k < retrieved.length; k++ ) {
										var analyse = retrieved[k].toLowerCase();

										if ( analyse.indexOf(compare) > -1 && input.val() !== "" && $.inArray(id, tempArray) < 0 ) {
											tempArray.push(id);
										}
									}
								} else {
									var analyse = retrieved.toLowerCase();

									if ( analyse.indexOf(compare) > -1 && input.val() !== "" && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								}
							}
						}

						resultArray[parameter] = tempArray;
					}

					// Tags

					function tagAnalysis() {
						for ( var n = 0; n < tagcloud.children(".tag").length; n++ ) {
							var parameter = tagcloud.children(".tag").eq(n).data("tag-parameter"),
								criteria = parameter,
								compare = outputArray[parameter],
								tempArray = [];

							for ( var i = 0; i < JSONobjects.length; i++ ) {
								var object = JSONobjects[i],
									id = object.Id,
									analyse = object[criteria];

								if ( analyse instanceof Array ) {
									var joined = analyse.concat(compare);
									if ( joined.duplicates().length > 0 && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								} else {
									if ( $.inArray(analyse, compare) > -1 && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								}
							}

							resultArray[parameter] = tempArray;
						}
					}

					// Run

					inputAnalysis();
					tagAnalysis();


					// Analyse rebuilt arrays and build final array

					for ( var i = 0; i < parameterArray.length; i++ ) {
						var outputSet = outputArray[parameterArray[i]],
							resultSet = resultArray[parameterArray[i]];

						existsArray.push(outputSet.length > 0);

						if ( outputSet.length > 0 ) {
							var joined = resultSet.concat(allArray).duplicates();
							totalArray.push(joined);
						}
					}

					var outputCount = 0;
					for ( var i = 0; i < existsArray.length; i++ ) {
						if ( existsArray[i] === true ) outputCount++;
					}
					var hasOutput = outputCount >= 1;

					var cleanArray = totalArray.reduce().sort();


					// Empty Final array, compare id repetition against number of inputs, rebuild finalArray.

					function countRepeated(arr) {
						var counts = {};
						for ( var i = 0; i < arr.length; i++ ) {
						    var num = arr[i];
						    counts[num] = counts[num] ? counts[num] + 1 : 1;
						}
						return counts;
					}

					var analysis = countRepeated(cleanArray);

					if ( hasOutput ) {
						for ( var i = 0; i < cleanArray.length; i++ ) {
							if ( analysis[cleanArray[i]] === outputCount && $.inArray(cleanArray[i], finalArray) < 0 ) {
								finalArray.push(cleanArray[i]);
							}
						}
					} else {
						finalArray = allArray;
					}

					if ( config.application.debug ) console.log("Search == " + finalArray.length + " items");


					// Rebuild results

					var firstLoad = true;

					function rebuild() {
						function loadItems() {
							results.append(resultsPaginationElement);

							for ( var i = 0; i < JSONobjects.length; i++ ) {
								var object = JSONobjects[i],
									id = object.Id,
									image = object.Image,
									title = object.Title,

									dateStr = object.Date,
									z = dateStr.replace("Z", ""),
									a = z.split("T"),
									d = a[0].split("-"),
									t = a[1].split(":"),
									date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);

									hour = date.getHours();
									hours = hour < 10 ? "0" + hour : hour;
									minute = date.getMinutes();
									minutes = minute < 10 ? "0" + minute : minute;
									day = date.getDate();
									days = day < 10 ? "0" + day : day;
									month = date.getMonth();
									months = (month + 1) < 10 ? "0" + (month + 1) : (month + 1);
									year = date.getFullYear();
									years = year < 10 ? "0" + year : year;
									fulldate = hours + ":" + minutes + " @ " + days + "/" + months + "/" + years;

									url = object.Url,
									summary = object.Summary,
									type = object.Type,
									categories = object.Categories.length > 0 ? object.Categories.toString().replace(/,/g , ", ") : "None",
									tags = object.Tags.length > 0 ? object.Tags.toString().replace(/,/g , ", ") : "None",
									result = '<div class="search-item loading">\
												  <a class="img" href="' + url + '" style="background: url(' + image + ') no-repeat center center;"></a>\
												  <a class="title" href="' + url + '">' + title + '</a>\
												  <div class="date">' + fulldate + '</div>\
												  <div class="type">' + type + '</div>\
												  <div class="summary">' + summary + '</div>\
												  <div class="info">\
													  <div class="categories" data-tooltip="' + categories + '">Categories</div>\
													  <div class="tags" data-tooltip="' + tags + '">Tags</div>\
												  </div>\
											  </div>';


								if ( $.inArray(id, finalArray) > -1 ) results.append(result);
							}

							initTooltips();

							results.append(resultsPaginationElement);

							firstLoad = false;
						}

						if ( firstLoad ) loadItems();


						// Post build

						function showItem(el, i) {
							if ( i < (config.search.count * currentPage) ) {
								if ( config.search.pagination ) {
									el.eq(i).removeClass("loading");
								} else {
									setTimeout(function() {
										el.eq(i).removeClass("loading");
									}, 100 * (i % config.search.count));
								}
							}
						}

						var items = results.children(".search-item");
						var resultsCount = items.length;

						count
							.css({"display": "inline-block"})
							.html((resultsCount === 0 ? "No" : resultsCount) + " result" + (resultsCount === 1 ? " " : "s ") + "found");

						if ( resultsCount ) {
							results.removeClass("loading").removeClass("no-results");

							if ( config.search.pagination ) items.addClass("loading");
							for ( var i = (config.search.count * (currentPage - 1)); i < resultsCount; i++ ) {
								showItem(items, i);
							}
						} else {
							if ( hasOutput ) {
								results.removeClass("loading").addClass("no-results");
							} else {
								results.removeClass("no-results").addClass("loading");
							}
						}


						// Pagination and Selective loading

						var pagination = $(".search-pagination");

						if ( config.search.pagination ) {
							if ( resultsCount > config.search.count ) {
								pagination.show();
							} else {
								pagination.hide();
							}
						} else {
							if ( resultsCount > config.search.count * currentPage ) {
								load.show();
							} else {
								load.hide();
							}
						}
					}

					results.html("");
					rebuild();


					// Pagination and Selective loading

					var items = results.children(".search-item");
					var resultsCount = items.length;

					if ( config.search.pagination ) {
						var pagination = $(".search-pagination");
						var pages = 0;

						for ( var i = 0; i < resultsCount; i++ ) {
							if ( i % config.search.count == 0 ) {
								pages++;

								var page = "<button data-page='" + pages + "'>" + pages + "</button>";
								pagination.append(page);
							}
						}

						$("[data-page='" + currentPage + "']").addClass("primary");

						$("[data-page]").off().on("click", function() {
							currentPage = $(this).data("page");

							console.log(currentPage);

							$("[data-page]").removeClass("primary");
							$("[data-page='" + currentPage + "']").addClass("primary");

							rebuild();
						});
					} else {
						load.on("click", function() {
							currentPage++;
							rebuild();
						});
					}
				}



				// Initialise

				updateResults();
			}
		});

		if ( config.application.debug ) console.log("Search :: Unified Search");
	}
}