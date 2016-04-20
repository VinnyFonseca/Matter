// Autocomplete

var initAutocomplete = function() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				url = el.data("feed"),
				input = el.children("input"),
				loader = el.children(".loader"),
				parameter = input.data("lookup"),
				listIndex = 0,
				listMax = 10,
				listShow = $(window).width() > 480 ? 7 : 5,
				selecting = false;

			el.append("<div class='autocomplete-list'></div>");
			var list = el.children(".autocomplete-list");

			var build = function(data) {
				// Create List UI

				list.children(".loader").hide();

				list.append("<ul class='no-results'><li>No matches found. Press Enter to search globally.</li></ul>");
				var noResults = list.children("ul.no-results");
				noResults.hide();

				list.append("<ul class='autocomplete-results'></ul>");
				var results = list.children("ul.autocomplete-results");
				results.append("<li class='divider'><span class='match-count'>0</span>Match<span class='plural'>es</span></li>");

				list.append("<ul class='autocomplete-suggestions'></ul>");
				var suggestions = list.children("ul.autocomplete-suggestions");
				suggestions.prepend("<li class='divider'>Suggested Items</li>");


				// Populate list

				var feed = data;
				var tempArray = [];

				for ( var i = 0; i < feed.length; i++ ) {
					var object = feed[i];
					var property = object[parameter];

					if ( property instanceof Array ) {
						for ( var j = 0; j < property.length; j++ ) {
							if ( $.inArray(property[j], tempArray) < 0 ) tempArray.push(object);
						}
					} else {
						if ( $.inArray(property, tempArray) < 0 ) tempArray.push(object);
					}
				}

				var itemsArray = tempArray.sort();

				for ( var k = 0; k < itemsArray.length; k++ ) {
					results.append(
						"<li data-keywords='" + itemsArray[k].keywords.join() + "'>\
							<a href='" + itemsArray[k].url + "'>" + itemsArray[k].title + "</a>\
						</li>"
					);
				}


				// Initialise

				var init = function() {
					// Update list

					var show = function() {
						var item = list.find("ul:not(.no-results) li:not(.divider)");
						var term = input.val();
						var filter = new RegExp(term, "i");


						// If direct result, append to results list.
						// If not, append to suggestions list.

						item.each(function() {
							if ( $(this).text().search(filter) >= 0 ) {
								$(this).appendTo(results);
							} else {
								if ( $(this).data("keywords").search(filter) >= 0 ) {
									$(this).appendTo(suggestions);
								}
							}
						});

						var result = results.children("li:not(.divider)");
						loader.show();
						results.show();

						result.each(function() {
							if ( $(this).text().search(filter) >= 0 ) {
								if ( results.children(".selected").length < listMax ) $(this).addClass("selected");
							} else {
								$(this).removeClass("selected");
							}

							results.find(".divider .match-count").text(results.find(".selected").length + " ");

							if ( results.children(".selected").length == 1 ) {
								results.find(".divider .plural").hide();
							} else {
								results.find(".divider .plural").show();
							}
						}).on("click", function() {
							var value = $(this).text().trim();
							input.val(value).trigger({type: "keydown", which: 13});
							list.removeClass("active");
							matter.text.unhighlight(results.children("li.selected"));
						});

						if ( results.children(".selected").length === 0 ) {
							results.hide().find(".divider .match-count").text("No ");
						}

						if ( term.length > 0 ) {
							list.addClass("active");
						} else {
							list.removeClass("active");
						}


						// Code for keyword recognition on suggested items

						var suggestion = suggestions.children("li:not(.divider)");
						suggestions.show();

						suggestion.each(function() {
							if ( $(this).data("keywords").search(filter) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}

							if ( suggestions.children(".selected").length === 0 ) suggestions.hide();
						});


						// List states

						var totalShowing = list.find("li.divider:visible").length + list.find("li.selected").length;

						if ( totalShowing >= listShow ) {
							list.css("height", list.find("li.selected").outerHeight() * listShow);
						} else {
							list.css("height", "auto");
						}

						if ( list.find(".selected").length > 0 ) {
							noResults.hide();
							matter.text.highlight(results.children("li.selected"), term);
						} else {
							noResults.show();
							matter.text.unhighlight(results.children("li.selected"));
						}

						loader.hide();
					}


					// List interactions

					list.on("mouseenter", function() {
						selecting = true;
					}).on("mouseleave", function() {
						selecting = false;
					});


					// Keyboard controls

					input.on("keydown", function(event) {
						if ( list.hasClass("active") ) {
							var selectedResult = results.children("li.selected");
							var listTop = list.scrollTop();
							var listBottom = listTop + list.height();
							var resultTop;
							var resultBottom;

							results.children("li:not(.divider)").removeClass("active");

							if ( event.keyCode === 38 && listIndex > 0 ) { // Arrow Up
								listIndex--;
								selectedResult.eq(listIndex).addClass("active");

								resultTop = selectedResult.eq(listIndex).position().top;
								resultBottom = resultTop + selectedResult.eq(listIndex).outerHeight();

								if ( resultTop < listTop ) list.scrollTop(resultBottom - list.height());
							}

							if ( event.keyCode === 40 && listIndex < selectedResult.length - 1 ) { // Arrow Down
								listIndex++;
								selectedResult.eq(listIndex).addClass("active");

								resultTop = selectedResult.eq(listIndex).position().top;
								resultBottom = resultTop + selectedResult.eq(listIndex).outerHeight();

								if ( resultBottom > listBottom ) list.scrollTop(resultTop);
							}

							if ( event.keyCode === 9 || event.keyCode === 13 ) { // Enter or Tab
								input.val(results.children("li.active").text());
							}

							if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
								listIndex = -1;
							}

							if ( event.keyCode === 27 ) { // Escape
								input.blur();
							}
						}
					})
					.on("keyup", function(event) {
						show();
					})
					.on("focus", function() {
						listIndex = list.find("li.active").length ? listIndex : -1;
						show();
					})
					.on("blur", function() {
						if ( selecting === false ) {
							list.removeClass("active");
							matter.text.unhighlight(list.find("li"));
						}
					});
				}

				init();
			}

			matter.data.get(url, build);
		});

		debug.log(":: Autocomplete");
	}
}