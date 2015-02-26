// Unified Search

function initSearch() {
	if ( $("[data-search]").length ) {
		$("[data-search]").each(function(i) {
			var el = $(this),
				url = el.data("search"),
				index = i,
				input = el.find("input[data-search-parameter]");
				select = el.find("select[data-search-parameter]");
				outputArray = [],
				tagcloudElement = '<ul class="tagcloud"></ul>',
				tagclose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">',
				resultsElement = '<div class="search-results block-reset loading"></div>';

			el.append(tagcloudElement).append(resultsElement);
			var tagcloud = el.find("ul.tagcloud");
			var results = el.find(".search-results");




			dataRequest(url, "GET", build);

			function build(data) {

				// Update functions

				function updateResults() {
					results.html("");


					// Create all arrays for analysis and populate allArray with all items for comparison.

					var allArray = [];
					var existsArray = [];
					var finalArray = [];

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i],
							id = object.Id;

						allArray.push(id);
					}


					// Get all values from all inputs and rebuild arrays.

					input.each(function() {
						var parameter = $(this).data("search-parameter"),
							criteria = parameter.replace(/\s/g, "").split(",");

						var tempArray = [];
						resultArray[parameter] = [];

						for ( var i = 0; i < criteria.length; i++ ) {
							for ( var j = 0; j < data.Items.length; j++ ) {
								var object = data.Items[j],
									id = object.Id;
									compare = outputArray[parameter],
									analyse = object[criteria[i]].toLowerCase();

								if ( analyse instanceof Array ) {
									if ( $.arrayIntersect(analyse, compare).length > 0 && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								} else {
									if ( analyse.indexOf(compare) > -1 && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								}
							}

							resultArray[parameter] = tempArray;
						}
					});

					tagcloud.children(".tag[data-tag-parameter]").each(function() {
						var parameter = $(this).data("tag-parameter"),
							criteria = parameter,
							compare = outputArray[parameter];

						var tempArray = [];
						resultArray[parameter] = [];

						for ( var i = 0; i < data.Items.length; i++ ) {
							var object = data.Items[i],
								id = object.Id,
								analyse = object[criteria];

							if ( analyse instanceof Array ) {
								if ( $.arrayIntersect(analyse, compare).length > 0 && $.inArray(id, tempArray) < 0 ) {
									tempArray.push(id);
								}
							} else {
								if ( $.inArray(analyse, compare) > -1 && $.inArray(id, tempArray) < 0 ) {
									tempArray.push(id);
								}
							}
						}

						resultArray[parameter] = tempArray;
					});


					// Analyse rebuilt arrays

					for ( var i = 0; i < parameterArray.length; i++ ) {
						var dataset = outputArray[parameterArray[i]];
						var analyse = resultArray[parameterArray[i]];

						dataset.length > 0 ? existsArray.push(true) : existsArray.push(false);

						finalArray.push($.arrayIntersect(analyse, allArray));
					}

					var hasOutput = $.inArray(true, existsArray) >= 0 ? true : false;

					if ( hasOutput ) {
						finalArray = finalArray.toString().split(",").clean("");
						console.log(finalArray, finalArray.length);

						var outputCount = 0;
						for ( var i = 0; i < existsArray.length; i++ ) {
							if ( existsArray[i] === true ) outputCount++;
						}
						if ( outputCount > 1 ) finalArray = finalArray.sort().filter( function(v,i,o){if(i>=0 && v!==o[i-1]) return v;});
					} else {
						finalArray = allArray;
					}

					console.log(finalArray, finalArray.length);


					// Rebuild results

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i],
							id = object.Id,
							image = object.Image,
							title = object.Title,
							date = new Date(object.Date),
							hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
							minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
							day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
							month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
							year = date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
							fulldate = hour + ":" + minute + " @ " + day + "/" + month + "/" + year;
							url = object.Url,
							summary = object.Summary,
							type = object.Type,
							categories = object.Categories
							tags = object.Tags;
							item =  '<div class="search-item loading">\
										 <a href="' + url + '">\
											 <img src="' + image + '" />\
											 <div class="title">' + title + '</div>\
										 </a>\
										 <div class="date">' + fulldate + '</div>\
										 <div class="summary">' + summary + '</div>\
										 <div class="type">Type: ' + type + '</div>\
										 <div class="categories">Categories: ' + categories + '</div>\
										 <div class="tags">Tags: ' + tags + '</div>\
									</div>';

						for ( var j = 0; j < finalArray.length; j++ ) {
							if ( id == finalArray[j] ) results.append(item);
						}
					}


					// Results behaviour after built

					var hasResults = results.children(".search-item").length ? true : false;

					function showItem(item, i) {
						setTimeout(function() {
							item.eq(i).removeClass("loading");
						}, 100 * i);
					}

					if ( hasResults ) {
						results.removeClass("loading").removeClass("no-results");
						var items = results.children(".search-item");
						for ( var i = 0; i < items.length; i++ ) showItem(items, i);
					} else {
						hasOutput ? results.removeClass("loading").addClass("no-results") : results.removeClass("no-results").addClass("loading");
					}
				}

				function updateTags(parameter) {
					var target = tagcloud.children(".tag[data-tag-parameter='" + parameter + "']");

					var tempArray = [];

					for ( var n = 0; n < target.length; n++ ) {
						var value = target.eq(n).data("tag");
						tempArray.push(value);
					}

					outputArray[parameter] = tempArray;

					initSVGs();
				}




				// Populate Dropdowns

				function populateSelects(parameter) {
					var target = el.find("select[data-search-parameter='" + parameter + "']");

					var tempArray = [];
					outputArray[parameter] = [];
					resultArray[parameter] = [];

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i];
						var property = object[parameter];

						if ( property instanceof Array ) {
							for ( var k = 0; k < property.length; k++ )
								if ( $.inArray(property[k], tempArray) < 0 ) tempArray.push(property[k]);
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}
					tempArray.sort();

					var placeholder = '<option class="placeholder">Select ' + parameter + '...</option>';
					target.append(placeholder);

					for ( var value in tempArray ) {
						var option = '<option value="' + tempArray[value] + '">' + tempArray[value] + '</option>';
						target.append(option);
					}
				}




				// Interactions Behaviour

				var parameterArray = [];
				var resultArray = [];

				input.each(function() {
					var parameter = $(this).data("search-parameter");

					parameterArray.push(parameter);
					outputArray[parameter] = [];
					resultArray[parameter] = [];

					$(this).on("keyup", function(event) {
						var value = $(this).val();
							parameter = $(this).data("search-parameter");

						outputArray[parameter] = value.toLowerCase();

						updateResults();
						return false;
					});
				});

				select.each(function(i) {
					var placeholder = $(this).val(),
						parameter = $(this).data("search-parameter");

					populateSelects(parameter);

					parameterArray.push(parameter);
					outputArray[parameter] = [];
					resultArray[parameter] = [];

					$(this).on("change", function(event) {
						event.preventDefault();

						var value = $(this).val(),
							tag = '<li class="tag valign-middle" data-tag-group="' + i + '" data-tag-parameter="' + parameter + '" data-tag="' + value + '">' + '<span>' + value + '</span>' + tagclose + '</li>';

						if ( value !== "" ) {
							if ( $.inArray(value, outputArray[parameter]) < 0 ) {
								tagcloud.addClass("active").append(tag);
							} else {
								notify("This tag already exists.", "failure");
							}
						}

						updateTags(parameter);
						updateResults();
					});
				});

				tagcloud.on("click", ".tag", function() {
					var parameter = $(this).data("tag-parameter");

					$(this).remove();
					tagcloud.children(".tag").length > 0 ? tagcloud.addClass("active") : tagcloud.removeClass("active");

					updateTags(parameter);
					updateResults();
				});




				// Initialise

				initDropdowns();
				updateResults();
			}
		});

		if (config.application.debug) console.log("Search :: Unified Search");
	}
}