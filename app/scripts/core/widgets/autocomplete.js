// Autocomplete

var initAutocomplete = function() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				input = el.children("input"),
				resultIndex = 0,
				showCount = $(window).width() > 480 ? 7 : 5,
				resultsMax = 10,
				selecting = false;

			var urlResults = el.data("autocomplete-results");
			var urlSuggestions = el.data("autocomplete-suggestions");

			el.append("<div class='autocomplete-list'></div>");
			var list = el.children(".autocomplete-list");

			var build = function(data) {
				list.children(".loader").hide();

				list.append("<ul class='autocomplete-results'></ul>");
				var parameterResults = input.data("autocomplete-parameter");
				var results = list.children(".autocomplete-results");
				results.append("<li class='divider'><span class='match-count'>0</span>Match<span class='plural'>es</span></li>");

				var init = function() {
					var results = list.children("ul.autocomplete-results");
					var result = results.children("li:not(.divider)");

					var suggestions = list.children("ul.autocomplete-suggestions");
					var suggestion = suggestions.children("li:not(.divider)");

					var keyContacts = list.children("ul.autocomplete-key-contacts");
					var keyContact = keyContacts.children("li:not(.divider)");


					list.on("mouseenter", function() {
						selecting = true;
					}).on("mouseleave", function() {
						selecting = false;
					});


					input.on("keydown", function(event) {
						if ( list.hasClass("active") ) {
							var selectedResult = results.children("li.selected");
							var listTop = list.scrollTop();
							var listBottom = listTop + list.height();
							var resultTop;
							var resultBottom;

							if ( event.keyCode === 38 && resultIndex > 0 ) { // Arrow Up
								result.removeClass("active");
								resultIndex--;
								selectedResult.eq(resultIndex).addClass("active");

								resultTop = selectedResult.eq(resultIndex).position().top;
								resultBottom = resultTop + selectedResult.eq(resultIndex).outerHeight();

								if ( resultTop < listTop ) list.scrollTop(resultBottom - list.height());
							}

							if ( event.keyCode === 40 && resultIndex < selectedResult.length - 1 ) { // Arrow Down
								result.removeClass("active");
								resultIndex++;
								selectedResult.eq(resultIndex).addClass("active");

								resultTop = selectedResult.eq(resultIndex).position().top;
								resultBottom = resultTop + selectedResult.eq(resultIndex).outerHeight();

								if ( resultBottom > listBottom ) list.scrollTop(resultTop);
							}

							if ( event.keyCode === 9 || event.keyCode === 13 ) { // Enter or Tab
								input.val(results.children("li.active").text());
								result.removeClass("active");
							}

							if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
								result.removeClass("active");
								resultIndex = -1;
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
						resultIndex = list.find("li.active").length ? resultIndex : -1;
						show();
					})
					.on("blur", function() {
						if ( selecting === false ) {
							list.removeClass("active");
							unhighlight(list.find("li"));
						}
					});


					var show = function() {
						var term = input.val();
						var filter = new RegExp(term, "i");

						results.show();

						result.each(function() {
							if ( $(this).text().search(filter) < 0 ) {
								$(this).removeClass("selected");
							} else {
								if ( results.children(".selected").length < resultsMax ) $(this).addClass("selected");
							}

							results.find(".divider .match-count").text(results.find(".selected").length + " ");

							console.log(results.children(".selected").length);

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

						if ( results.children(".selected").length === 0 ) results.hide();

						if ( term.length > 0 && results.children(".selected").length ) {
							list.addClass("active");
							highlight(results.children("li.selected"), term);
						} else {
							list.removeClass("active");
							unhighlight(results.children("li.selected"));
						}


						// Code for keyword recognition on suggested items

						suggestions.show();

						suggestion.each(function() {
							if ( $(this).data("keywords").search(filter) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}

							if ( suggestions.children(".selected").length === 0 ) suggestions.hide();
						});


						keyContacts.show();

						keyContact.each(function() {
							if ( $(this).data("keywords").search(filter) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}

							if ( keyContacts.children(".selected").length === 0 ) keyContacts.hide();
						});


						// List height

						var totalShowing = list.find("li.divider:visible").length + list.find("li.selected").length;

						if ( totalShowing >= showCount ) {
							list.height(result.outerHeight() * showCount);
						} else {
							list.height(result.outerHeight() * totalShowing);
						}
					}
				}


				var populate = function() {
					var JSONobjects = data.Results;
					var tempArray = [];

					for ( var i = 0; i < JSONobjects.length; i++ ) {
						var object = JSONobjects[i];
						var property = object[parameterResults];

						if ( property instanceof Array ) {
							for ( var j = 0; j < property.length; j++ ) {
								if ( $.inArray(property[j], tempArray) < 0 ) tempArray.push(property[j]);
							}
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}

					var resultItems = tempArray.sort();
					for ( var k = 0; k < resultItems.length; k++ ) results.append("<li>" + resultItems[k] + "</li>");
				}

				populate();


				var suggest = function(data) {
					var JSONobjects = data.Results;
					var tempArray = [];

					for ( var i = 0; i < JSONobjects.length; i++ ) {
						var object = JSONobjects[i];
						var property = object[parameterSuggestions];

						if ( property instanceof Array ) {
							for ( var j = 0; j < property.length; j++ ) {
								if ( $.inArray(property[j], tempArray) < 0 && $.inArray(object, tempArray) < 0 ) tempArray.push(object);
							}
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(object);
						}
					}


					var suggestedArray = tempArray.sort();
					var keyContactArray = [];


					if ( suggestedArray.length > 0) {
						list.append("<ul class='autocomplete-suggestions'></ul>");
						var suggestions = list.children(".autocomplete-suggestions");
						var parameterSuggestions = "PageTitle";
						suggestions.prepend("<li class='divider'>Suggested Items</li>");
					}

					for ( var k = 0; k < suggestedArray.length; k++ ) {
						var suggestedURL = suggestedArray[k].PageUrl;

						if ( suggestedURL.indexOf("key-person") > -1 ) {
							keyContactArray.push(suggestedArray[k]);
						} else {
							suggestions.append(
								"<li data-keywords='" + suggestedArray[k].Keywords.join() + "'>\
									<a href='" + suggestedArray[k].PageUrl + "'>" + suggestedArray[k].PageTitle + "</a>\
								</li>"
							);
						}
					}


					if ( keyContactArray.length > 0) {
						list.append("<ul class='autocomplete-key-contacts'></ul>");
						var keyContacts = list.children(".autocomplete-key-contacts");
						var parameterKeyContacts = "PageTitle";
						keyContacts.append("<li class='divider'>Key Contacts</li>");
					}

					for ( var l = 0; l < keyContactArray.length; l++ ) {
						keyContacts.append(
							"<li data-keywords='" + keyContactArray[l].Keywords.join() + "'>\
								<a href='" + keyContactArray[l].PageUrl + "'>" + keyContactArray[l].PageTitle + "</a>\
							</li>"
						);
					}

					init();
				}

				dataRequest(urlSuggestions, "GET", suggest);
			}


			// input.on("keydown", function(event) {
			// 	if ( list.hasClass("active") ) {
			// 		var selectedResult = results.children("li.selected");
			// 		var listTop = list.scrollTop();
			// 		var listBottom = listTop + list.height();
			// 		var resultTop;
			// 		var resultBottom;

			// 		if ( event.keyCode === 38 && resultIndex > 0 ) { // Arrow Up
			// 			result.removeClass("active");
			// 			resultIndex--;
			// 			selectedResult.eq(resultIndex).addClass("active");

			// 			resultTop = selectedResult.eq(resultIndex).position().top;
			// 			resultBottom = resultTop + selectedResult.eq(resultIndex).outerHeight();

			// 			if ( resultTop < listTop ) list.scrollTop(resultBottom - list.height());
			// 		}

			// 		if ( event.keyCode === 40 && resultIndex < selectedResult.length - 1 ) { // Arrow Down
			// 			result.removeClass("active");
			// 			resultIndex++;
			// 			selectedResult.eq(resultIndex).addClass("active");

			// 			resultTop = selectedResult.eq(resultIndex).position().top;
			// 			resultBottom = resultTop + selectedResult.eq(resultIndex).outerHeight();

			// 			if ( resultBottom > listBottom ) list.scrollTop(resultTop);
			// 		}

			// 		if ( event.keyCode === 9 || event.keyCode === 13 ) { // Enter or Tab
			// 			input.val(results.children("li.active").text());
			// 			result.removeClass("active");
			// 		}

			// 		if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
			// 			result.removeClass("active");
			// 			resultIndex = -1;
			// 		}

			// 		if ( event.keyCode === 27 ) { // Escape
			// 			input.blur();
			// 		}
			// 	}
			// })
			// .on("keyup", function(event) {
			// 	show(this);
			// })
			// .on("focus", function() {
			// 	resultIndex = list.find("li.active").length ? resultIndex : -1;
			// 	show(this);
			// })
			// .on("blur", function() {
			// 	if ( selecting === false ) {
			// 		list.removeClass("active");
			// 		unhighlight(list.find("li"));
			// 	}
			// });

			dataRequest(urlResults, "GET", build);
		});

		if ( config.application.debug ) console.log("Search :: Autocomplete");
	}
}