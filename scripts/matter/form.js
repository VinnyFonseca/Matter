function buildDropdowns(i) {
	var el = $("select").eq(i),
		size = size !== "" ? parseInt(el.attr("size"), 10) : 1,
		type = typeof size !== "undefined" && size !== "" && size > 1 ? "list" : "drop",
		options = type === "drop" ? el.find("option").not(".placeholder") : el.find("option");

	$(".dropdown-" + i).find(".dropdown").html("");

	options.each(function() {
		var option = $(this),
			parent = $(".dropdown-" + i),
			isSelected = option.is(":selected") ? "active" : "",
			item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + '</div>';

		parent.find(".dropdown").append(item);

		if ( type == "list" ) parent.find(".dropdown").height(((parent.find(".dropdown-item").outerHeight() + 1) * size) - 1);
	});


	// Click Event

	$(".dropdown-" + i).each(function() {
		var drop = $(this),
			dropdownItem = drop.find(".dropdown-item"),
			target = drop.children(".dropdown-current"),
			select = drop.find("select");

		drop.addClass(select.attr("class") + "-wrapper");

		drop.off().on("click", function() {
			if ( type == "drop" ) {
				if ( !drop.hasClass("active") ) {
					$(".dropdown-wrapper").removeClass("active");
					drop.addClass("active");

					$(this).find("select").focus();
				} else {
					$(".dropdown-wrapper").removeClass("active");
					$(this).find("select").blur();
				}
			}
		});

		dropdownItem.off().on("click", function() {
			var value = $(this).attr("data-value");

			dropdownItem.removeClass("active");
			target.text($(this).text()).attr("data-value", value);
			select.val(value);

			$(this).addClass("active").parents("form.auto-send").submit();
		});

		select.off().on("change", function() {
			var selected = $(this).children("option:selected");

			dropdownItem.removeClass("active");
			target.text(selected.text()).attr("data-value", selected.val());

			for ( var i = 0; i < dropdownItem.length; i++ ) {
				if ( dropdownItem.eq(i).text() === selected.text() ) {
					dropdownItem.eq(i).addClass("active").parents("form.auto-send").submit();
				}
			}
		});
	});

	$("html, body").off().on("click", function(event) {
		if ( !$(event.target).closest(".dropdown").length &&!$(event.target).closest(".dropdown-wrapper").length && $(".dropdown-wrapper").hasClass("active") ) {
			$(".dropdown-wrapper").removeClass("active");
		}
	});
}

// Dropdowns

function initDropdowns() {
	$("select").each(function(i) {
		var el = $(this),
			size = parseInt(el.attr("size"), 10),
			type = typeof size !== "undefined" && size !== "" && size > 1 ? "list" : "drop",
			wrapper = '<div class="dropdown-' + i + ' dropdown-wrapper ' + type + '" data-size="' + size + '"></div>',
			selected = el.find("option:selected"),
			arrow = '<div class="dropdown-arrow">&#9660;</div>',
			current = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + '</div>',
			dropdown = '<div class="dropdown"></div>';

		el.wrap(wrapper);
		$(".dropdown-" + i).prepend(dropdown).prepend(arrow).prepend(current);

		buildDropdowns(i);
	});

	if (config.application.debug) console.log("Form :: Dropdowns");
}




function loadFileInputs(inputLimit, inputName) {
	var el = $(".multifile-wrapper"),
		inputCount = el.length,
		limitElement = $(".multi-limit"),
		currentCount = inputLimit - inputCount,
		isSingular = currentCount == 1 ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(),
		newInput = '<div class="multifile-wrapper mobile-hide last">\
						<input type="file" id="' + inputName + "[" + inputCount + "]" + '" name="' + inputName + "[" + inputCount + "]" + '" />\
						<div class="fakefile">\
							<div class="button primary fake-upload">Choose File</div>\
							<div class="file-result">No file chosen</div>\
							<div class="button primary fake-close">&times;</div>\
						</div>\
					</div>';

	el.each(function(i) {
		var el = $(this);
		var resultElement = el.find(".file-result");

		el.find("input").attr("id", inputName + "[" + i + "]").attr("name", inputName + "[" + i + "]");

		el
		.off("click")
		.on("click", ".fake-upload", function() {
			el.find("input").trigger("click");
		})
		.on("click", ".fake-close", function() {
			if ( inputCount == inputLimit && !$(".multifile-wrapper.last").length ) $(newInput).insertAfter($(".multifile-wrapper").eq(inputCount - 1));
			el.remove();
			loadFileInputs(inputLimit, inputName);
		})
		.off("change")
		.on("change", "input", function() {
			var text = $(this).val().replace("C:\\fakepath\\", "");
			resultElement.html(text).addClass('loaded');

			if ( inputCount < inputLimit ) $(newInput).insertAfter(el);
			loadFileInputs(inputLimit, inputName);
			if ( i < inputCount ) el.removeClass("last");
		});
	});

	limitElement.html(currentCount);

	if (config.application.debug) console.log("Form :: File Inputs");
}




$(window).load(function() {

	// Datepicker

	$("input[data-calendar='true']").datepicker({
		format: "dd/mm/yyyy",
		todayBtn: "linked"
	});



	// Autocomplete

	$("form").on('submit', function() {
		console.log('Intentional: Form submit blocked.');
		return false;
	});

	$(".autocomplete-wrapper").each(function() {
		var el = $(this),
			itemIndex = 0,
			url = el.attr("data-url"),
			selecting = false;

		el.append("<ul></ul>");
		dataRequest(url, "GET", build);

		var input = el.children("input"),
			list = el.children("ul");

		function build(data) {
			for ( var i = 0; i < data.length; i++ ) {
				el.children("ul").append("<li>" + data[i] + "</li>");
			}

			var item = list.children("li");

			function showResults(target) {
				var filter = $(target).val();

				if ( filter.length > 0 ) {
					list.addClass("active").unhighlight().highlight(filter);
				} else {
					list.unhighlight().removeClass("active");
				}


				item.each(function() {
					var isValid = $(this).text().search(new RegExp(filter, "i")) < 0 ? $(this).removeClass("selected") : $(this).addClass("selected");
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
						// console.log(event.keyCode);

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
							list.unhighlight().removeClass("active");
						}
						if ( event.keyCode === 9 ) { // Tab
							input.val(list.children("li.active").text());
							item.removeClass("active");
							list.unhighlight().removeClass("active");
						}

						if ( event.keyCode === 8 || event.keyCode === 46 ) { // Backspace and Delete
							item.removeClass("active");
							itemIndex = 0;
						}

						if ( event.keyCode === 27 ) { // Escape
							list.unhighlight().removeClass("active");
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




	// File Uploads

	$(".file-wrapper:not('.last')").each(function() {
		var el = $(this),
			input = el.find("input"),
			button = el.find(".fake-upload"),
			result = el.find(".file-result");

		button.on("click", function() {
			input.trigger("click");
		});

		input.on("change", function() {
			var text = $(this).val().replace("C:\\fakepath\\", "");
			result.html(text).addClass('loaded');
		});
	});

});
