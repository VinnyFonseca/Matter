// Autocomplete

function highlight(el, val) {
	var match = RegExp(val, 'gi');

	el.each(function() {
		$(this).filter(function() {
			return match.test($(this).text());
		}).html(function() {
			if ( !val ) return $(this).text();
			return $(this).text().replace(match, '<span class="highlight">$&</span>');
		});
	});
}

function unhighlight(el) {
	el.find("span.highlight").replaceWith(function() {
		return $(this).text();
	});
}

function initAutocomplete() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				input = el.children("input"),
				itemIndex = -1,
				url = el.data("autocomplete"),
				parameter = input.data("autocomplete-parameter"),
				selecting = false;

			el.append("<div class='divider'>" + parameter + "</div>");
			el.append("<ul class='autocomplete-results'></ul>");
			var list = el.children("ul");

			dataRequest(url, "GET", build);

			function build(data) {
				var JSONobjects = data.Results;

				function populateList(parameter) {
					var tempArray = [];

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

					tempArray.sort();

					for ( var i = 0; i < tempArray.length; i++ ) list.append("<li>" + tempArray[i] + "</li>");
				}
				populateList(parameter);


				var item = list.children("li").not(".divider");

				list.on("mouseenter", function() {
					selecting = true;
				}).on("mouseleave", function() {
					selecting = false;
				});


				input
					.on("keydown", function(event) {
						if ( list.hasClass("active") ) {
							var selectedItem = list.children("li.selected");

							if ( event.keyCode === 38 && itemIndex > -1 ) { // Arrow Up
								item.removeClass("active");
								itemIndex--;
								selectedItem.eq(itemIndex).addClass("active");

								// Self scroll up on every 6th item
								if ( itemIndex % 7 === 6 )	list.scrollTop((item.outerHeight() - 1) * (7 * ((itemIndex - 6) / 7)));
							}

							if ( event.keyCode === 40 && itemIndex < selectedItem.length - 1 ) { // Arrow Down
								item.removeClass("active");
								itemIndex++;
								selectedItem.eq(itemIndex).addClass("active");

								// Self scroll down on every 7th item
								if ( itemIndex % 7 === 0 )	list.scrollTop((item.outerHeight() - 1) * (7 * (itemIndex / 7)));
							}

							if ( event.keyCode === 9 || event.keyCode === 13 ) { // Enter or Tab
								input.val(list.children("li.active").text());
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
						itemIndex = list.children("li.active").length ? itemIndex : -1;
						showResults(this);
					})
					.on("blur", function() {
						if ( selecting === false ) {
							el.removeClass("active");
							unhighlight(list.find("li"));
						}
					});


				function showResults(target) {
					var filter = $(target).val();

					item.each(function() {
						$(this).text().search(new RegExp(filter, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
					}).on("click", function() {
						input.val($(this).text()).trigger({type: "keydown", which: 13});
						el.removeClass("active");
						unhighlight(list.find("li"));
					});

					if ( filter.length > 0 && item.hasClass("selected") ) {
						el.addClass("active");
						highlight(list.find("li"), filter);
					} else {
						el.removeClass("active");
						unhighlight(list.find("li"));
					}
				}
			}
		});

		if ( config.application.debug ) console.log("Search :: Autocomplete");
	}
}