// Autocomplete

var initAutocomplete = function() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				url = el.data("autocomplete-feed"),
				input = el.children("input"),
				loader = el.children(".loader"),
				parameter = input.data("autocomplete-parameter"),
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

				list.append("<ul class='autocomplete-key-contacts'></ul>");
				var keyContacts = list.children("ul.autocomplete-key-contacts");
				keyContacts.append("<li class='divider'>Key Contacts</li>");


				// Populate list

				var JSONobjects = data.Results;
				var tempArray = [];

				for ( var i = 0; i < JSONobjects.length; i++ ) {
					var object = JSONobjects[i];
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
						"<li data-keywords='" + itemsArray[k].Keywords.join() + "'>\
							<a href='" + itemsArray[k].Url + "'>" + itemsArray[k].Title + "</a>\
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
						// If in suggestions, and URL contains "key-person", append to keyContacts list.

						item.each(function() {
							if ( $(this).text().search(filter) >= 0 ) {
								$(this).appendTo(results);
							} else {
								if ( $(this).data("keywords").search(filter) >= 0 ) {
									$(this).appendTo(suggestions);

									if ( $(this).children("a").attr("href").indexOf("key-person") > -1 ) {
										$(this).appendTo(keyContacts);
									}
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
							input.val($(this).text()).trigger({type: "keydown", which: 13});
							list.removeClass("active");
							unhighlight(results.children("li.selected"));
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


						var keyContact = keyContacts.children("li:not(.divider)");
						keyContacts.show();

						keyContact.each(function() {
							if ( $(this).data("keywords").search(filter) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}

							if ( keyContacts.children(".selected").length === 0 ) keyContacts.hide();
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
							highlight(results.children("li.selected"), term);
						} else {
							noResults.show();
							unhighlight(results.children("li.selected"));
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
							unhighlight(list.find("li"));
						}
					});
				}

				init();


				// var suggest = function(data) {
				// 	var JSONobjects = data.Results;
				// 	var tempArray = [];

				// 	for ( var i = 0; i < JSONobjects.length; i++ ) {
				// 		var object = JSONobjects[i];
				// 		var property = object[parameter];

				// 		if ( property instanceof Array ) {
				// 			for ( var j = 0; j < property.length; j++ ) {
				// 				if ( $.inArray(property[j], tempArray) < 0 && $.inArray(object, tempArray) < 0 ) tempArray.push(object);
				// 			}
				// 		} else {
				// 			if ( $.inArray(property, tempArray) < 0 ) tempArray.push(object);
				// 		}
				// 	}


				// 	var suggestedArray = tempArray.sort();
				// 	var keyContactArray = [];


				// 	if ( suggestedArray.length > 0) {
				// 		list.append("<ul class='autocomplete-suggestions'></ul>");
				// 		var suggestions = list.children("ul.autocomplete-suggestions");
				// 		suggestions.prepend("<li class='divider'>Suggested Items</li>");
				// 	}

				// 	for ( var k = 0; k < suggestedArray.length; k++ ) {
				// 		var suggestedURL = suggestedArray[k].Url;

				// 		if ( suggestedURL.indexOf("key-person") > -1 ) {
				// 			keyContactArray.push(suggestedArray[k]);
				// 		} else {
				// 			suggestions.append(
				// 				"<li data-keywords='" + suggestedArray[k].Keywords.join() + "'>\
				// 					<a href='" + suggestedArray[k].Url + "'>" + suggestedArray[k].Title + "</a>\
				// 				</li>"
				// 			);
				// 		}
				// 	}


				// 	if ( keyContactArray.length > 0) {
				// 		list.append("<ul class='autocomplete-key-contacts'></ul>");
				// 		var keyContacts = list.children("ul.autocomplete-key-contacts");
				// 		keyContacts.append("<li class='divider'>Key Contacts</li>");
				// 	}

				// 	for ( var l = 0; l < keyContactArray.length; l++ ) {
				// 		keyContacts.append(
				// 			"<li data-keywords='" + keyContactArray[l].Keywords.join() + "'>\
				// 				<a href='" + keyContactArray[l].Url + "'>" + keyContactArray[l].Title + "</a>\
				// 			</li>"
				// 		);
				// 	}
				// }
				// suggest();
				// init();

				// request(urlSuggestions, "GET", suggest);
			}

			request(url, "GET", build);
		});

		if ( config.application.debug ) console.log("Search :: Autocomplete");
	}
}