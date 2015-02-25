// Autocomplete

function initAutocomplete() {
	if ( $("[data-autocomplete]").length ) {
		$("[data-autocomplete]").each(function() {
			var el = $(this),
				input = el.children("input"),
				itemIndex = -1,
				url = el.data("autocomplete"),
				subject = input.data("autocomplete-subject"),
				selecting = false;

			el.append("<div class='divider'>" + subject + "</div>");
			el.append("<ul class='autocomplete-results'></ul>");
			var list = el.children("ul");

			dataRequest(url, "GET", build);

			function build(data) {
				function populateList(subject) {
					var tempArray = [];

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i];
						var property = object[subject];

						if ( property instanceof Array ) {
							for ( var k = 0; k < property.length; k++ )
								if ( $.inArray(property[k], tempArray) < 0 ) tempArray.push(property[k]);
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}

					tempArray.sort();
					for ( var value in tempArray ) list.append("<li>" + tempArray[value] + "</li>");
				}
				populateList(subject);


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
							list.unhighlight();
						}
					});


				function showResults(target) {
					var filter = $(target).val();

					item.each(function() {
						$(this).text().search(new RegExp(filter, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
					}).on("click", function() {
						input.val($(this).text()).trigger({type: "keydown", which: 13});
						el.removeClass("active");
						list.unhighlight();
					});

					if ( filter.length > 0 && item.hasClass("selected") ) {
						el.addClass("active");
						list.unhighlight().highlight(filter);
					} else {
						el.removeClass("active");
						list.unhighlight();
					}
				}
			}
		});

		if (config.application.debug) console.log("Search :: Autocomplete");
	}
}