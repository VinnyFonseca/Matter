// Autocomplete

var initAutocomplete = function() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				input = el.children("input"),
				itemIndex = -1,
				url = el.data("autocomplete-results"),
				parameter = input.data("autocomplete-parameter"),
				show = $(window).width > 480 ? 7 : 5,
				selecting = false;

			el.append("<div class='divider'>" + parameter + "</div>");
			el.append("<ul class='autocomplete-results'></ul>");
			var results = el.children("ul");

			var build = function(data) {
				var JSONobjects = data.Results;

				var populate = function(parameter) {
					var tempArray = [];

					for ( var i = 0; i < JSONobjects.length; i++ ) {
						var object = JSONobjects[i];
						var property = object[parameter];

						if ( property instanceof Array ) {
							for ( var j = 0; j < property.length; j++ ) {
								if ( $.inArray(property[j], tempArray) < 0 ) tempArray.push(property[j]);
							}
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}

					tempArray.sort();

					for ( var k = 0; k < tempArray.length; k++ ) results.append("<li>" + tempArray[k] + "</li>");
				}
				populate(parameter);


				var item = results.children("li").not(".divider");

				results.on("mouseenter", function() {
					selecting = true;
				}).on("mouseleave", function() {
					selecting = false;
				});


				input
					.on("keydown", function(event) {
						if ( results.hasClass("active") ) {
							var selectedItem = results.children("li.selected");

							if ( event.keyCode === 38 && itemIndex > -1 ) { // Arrow Up
								item.removeClass("active");
								itemIndex--;
								selectedItem.eq(itemIndex).addClass("active");

								// Self scroll up on every 6th item
								if ( itemIndex % 7 === 6 )	results.scrollTop((item.outerHeight() - 1) * (7 * ((itemIndex - 6) / 7)));
							}

							if ( event.keyCode === 40 && itemIndex < selectedItem.length - 1 ) { // Arrow Down
								item.removeClass("active");
								itemIndex++;
								selectedItem.eq(itemIndex).addClass("active");

								// Self scroll down on every 7th item
								if ( itemIndex % 7 === 0 )	results.scrollTop((item.outerHeight() - 1) * (7 * (itemIndex / 7)));
							}

							if ( event.keyCode === 9 || event.keyCode === 13 ) { // Enter or Tab
								input.val(results.children("li.active").text());
								item.removeClass("active");
							}

							if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
								item.removeClass("active");
								itemIndex = -1;
							}

							if ( event.keyCode === 27 ) { // Escape
								input.blur();
							}
						}
					})
					.on("keyup", function(event) {
						showResults(this);
					})
					.on("focus", function() {
						itemIndex = results.children("li.active").length ? itemIndex : -1;
						showResults(this);
					})
					.on("blur", function() {
						if ( selecting === false ) {
							el.removeClass("active");
							unhighlight(results.find("li"));
						}
					});


				var showResults = function(target) {
					var filter = $(target).val();

					item.each(function() {
						if ( $(this).text().search(new RegExp(filter, "i")) < 0 ) {
							$(this).removeClass("selected");
						} else {
							$(this).addClass("selected");
						}
					}).on("click", function() {
						input.val($(this).text()).trigger({type: "keydown", which: 13});
						el.removeClass("active");
						unhighlight(results.find("li"));
					});

					if ( filter.length > 0 && item.hasClass("selected") ) {
						el.addClass("active");
						results.height((item.outerHeight() - 1) * show);
						highlight(results.find("li"), filter);
					} else {
						el.removeClass("active");
						unhighlight(results.find("li"));
					}
				}
			}

			dataRequest(url, "GET", build);
		});

		if ( config.application.debug ) console.log("Search :: Autocomplete");
	}
}