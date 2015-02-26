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
				resultsElement = '<div class="search-results valign-middle"></div>';

			el.append(tagcloudElement).append(resultsElement);
			var tagcloud = el.find("ul.tagcloud");
			var results = el.find(".search-results");

			dataRequest(url, "GET", build);

			function build(data) {
				function updateResults() {
					results.html("");

					$.arrayIntersect = function(a, b) {
					    return $.grep(a, function(i) {
					        return $.inArray(i, b) > -1;
					    });
					};

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
									analyse = object[criteria[i]];

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



					// Intersect, Unique, Final values

					var prevArray = [];
					var allArray = [];
					var finalArray = [];

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i],
							id = object.Id;

						allArray.push(id);
					}

					for ( var i = 0; i < parameterArray.length; i++ ) {
						var analyse = resultArray[parameterArray[i]];

						console.log(analyse.length > 0, $.arrayIntersect(analyse, allArray), $.arrayIntersect(analyse, prevArray));

						if (
							analyse.length > 0 &&
							$.arrayIntersect(analyse, allArray).length > 0
						) {
							console.log($.arrayIntersect(analyse, prevArray));
							// finalArray.push($.arrayIntersect(analyse, allArray));
						}

						prevArray = finalArray;
					}


					console.log(outputArray, resultArray, finalArray, finalArray.length);

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
							item =  '<div class="search-item">\
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

					results.children(".search-item").length ? results.show() : results.hide();
				}

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



				// Interactive Behaviour

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

						outputArray[parameter] = value;

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

				initDropdowns();
				updateResults();
			}
		});

		if (config.application.debug) console.log("Search :: Unified Search");
	}
}