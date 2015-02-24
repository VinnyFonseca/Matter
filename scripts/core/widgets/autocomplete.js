// Autocomplete

function initAutocomplete() {
	$("[data-autocomplete]").each(function() {
		var el = $(this),
			itemIndex = 0,
			url = el.data("autocomplete"),
			selecting = false;

		el.append("<ul></ul>");
		dataRequest(url, "GET", build);

		var input = el.children("input"),
			list = el.children("ul");

		function build(data) {
			for ( var i = 0; i < data.length; i++ ) el.children("ul").append("<li>" + data[i] + "</li>");

			var item = list.children("li");

			function showResults(target) {
				var filter = $(target).val();

				filter.length > 0 ? list.addClass("active").unhighlight().highlight(filter) : list.unhighlight().removeClass("active");

				item.each(function() {
					$(this).text().search(new RegExp(filter, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
				}).on("click", function() {
					input.val($(this).text());
					list.unhighlight().removeClass("active");
				});
			}

			list.on("mouseenter", function() {
				selecting = true;
			}).on("mouseleave", function() {
				selecting = false;
			});

			input
				.on("keydown", function(event) {
					if ( list.hasClass("active") ) {

						var selectedItem = list.children("li.selected");

						if ( event.keyCode === 38 && itemIndex > 0 ) { // Arrow Down
							item.removeClass("active");
							itemIndex--;
							selectedItem.eq(itemIndex).addClass("active");

							// Self scroll up on every 9th item
							if ( itemIndex % 10 === 9 )	list.scrollTop((item.outerHeight() - 1) * (10 * ((itemIndex - 9) / 10)));
						}

						if ( event.keyCode === 40 && itemIndex < selectedItem.length - 1 ) { // Arrow Up
							item.removeClass("active");
							itemIndex++;
							selectedItem.eq(itemIndex).addClass("active");

							// Self scroll down on every 10th item
							if ( itemIndex % 10 === 0 )	list.scrollTop((item.outerHeight() - 1) * (10 * (itemIndex / 10)));
						}

						if ( event.keyCode === 13 ) { // Enter
							input.val(list.children("li.active").text()).blur();
							item.removeClass("active");
						}
						if ( event.keyCode === 9 ) { // Tab
							input.val(list.children("li.active").text());
							item.removeClass("active");
						}

						if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
							item.removeClass("active");
							itemIndex = 0;
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
					itemIndex = list.children("li.active").length ? itemIndex : 0;
					showResults(this);
				})
				.on("blur", function() {
					if ( selecting === false ) list.unhighlight().removeClass("active");
				});
		}
	});

	if (config.application.debug) console.log("Init :: Autocomplete");
}