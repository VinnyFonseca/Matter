// Autocomplete

var initAutocomplete = function() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				input = el.children("input"),
				resultIndex = 0,
				show = $(window).width() > 480 ? 7 : 5,
				selecting = false;

			var urlResults = el.data("autocomplete-results");
			var urlSuggestions = el.data("autocomplete-suggestions");

			el.append("<div class='autocomplete-list'></div>");
			var list = el.children(".autocomplete-list");

			list.append("<ul class='autocomplete-results'></ul>");
			var parameterResults = input.data("autocomplete-parameter");
			var results = list.children(".autocomplete-results");
			results.prepend("<li class='divider'>Matches</li>");


			var build = function(data) {
				var init = function() {
					var results = list.children("ul.autocomplete-results");
					var result = results.children("li:not(.divider)");

					var suggestions = list.children("ul.autocomplete-suggestions");
					var suggestion = suggestions.children("li:not(.divider)");

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
						showItems(this);
					})
					.on("focus", function() {
						resultIndex = list.find("li.active").length ? resultIndex : -1;
						showItems(this);
					})
					.on("blur", function() {
						if ( selecting === false ) {
							list.removeClass("active");
							unhighlight(list.find("li"));
						}
					});


					var showItems = function(target) {
						var filter = $(target).val();
						var term = new RegExp(filter, "i");

						result.each(function() {
							if ( $(this).text().search(term) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}
						}).on("click", function() {
							input.val($(this).text()).trigger({type: "keydown", which: 13});
							list.removeClass("active");
							unhighlight(results.children("li.selected"));
						});

						if ( filter.length > 0 && result.hasClass("selected") ) {
							list.addClass("active").height((result.outerHeight() - 1) * show);
							highlight(results.children("li.selected"), filter);
						} else {
							list.removeClass("active");
							unhighlight(results.children("li.selected"));
						}


						// Code for keyword recognition on suggested items

						suggestion.each(function() {
							if ( $(this).data("keywords").search(term) < 0 ) {
								$(this).removeClass("selected");
							} else {
								$(this).addClass("selected");
							}
						});
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
						var parameterSuggestions = "PageTitle";
						var suggestions = list.children(".autocomplete-suggestions");
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
						suggestions.append("<li class='divider'>Key Contacts</li>");
					}

					for ( var l = 0; l < keyContactArray.length; l++ ) {
						suggestions.append(
							"<li data-keywords='" + keyContactArray[l].Keywords.join() + "'>\
								<a href='" + keyContactArray[l].PageUrl + "'>" + keyContactArray[l].PageTitle + "</a>\
							</li>"
						);
					}

					init();
				}

				dataRequest(urlSuggestions, "GET", suggest);
			}

			dataRequest(urlResults, "GET", build);
		});

		if ( config.application.debug ) console.log("Search :: Autocomplete");
	}
}