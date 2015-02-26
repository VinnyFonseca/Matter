function buildDropdowns(i) {
	var el = $("select").eq(i),
		size = size == "undefined" || size === "" ? 1 : parseInt(el.attr("size"), 10),
		type = typeof size !== "undefined" && size !== "" && size > 1 ? "list" : "drop",
		option = el.find("option").not(".placeholder"),
		selected = el.find("option:selected"),
		wrapper = '<div class="dropdown-' + i + ' dropdown-wrapper ' + type + '" data-size="' + size + '"></div>',
		arrow = '<div class="dropdown-arrow valign-middle"><span>&#9660;</span></div>',
		current = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + '</div>',
		dropdown = '<div class="dropdown"></div>';


	// Build structure

	if ( $(".dropdown-" + i).length ) el.insertAfter($(".dropdown-" + i));
	$(".dropdown-" + i).remove();

	el.wrap(wrapper);

	var parentWrapper = $(".dropdown-" + i);

	parentWrapper.find(".dropdown").remove();
	parentWrapper.find(".dropdown-arrow").remove();
	parentWrapper.find(".dropdown-current").remove();
	$(".dropdown-" + i).prepend(dropdown).prepend(arrow).prepend(current);

	option.each(function() {
		var option = $(this),
			isSelected = option.is(":selected") ? "active" : "",
			item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + '</div>';

		parentWrapper.find(".dropdown").append(item);
	});

	if ( type == "list" ) {
		parentWrapper.find(".dropdown").height(((parentWrapper.find(".dropdown-item").outerHeight() + 1) * size) - 1);
	}


	// Click Event

	$(".dropdown-" + i).each(function() {
		var el = $(this),
			drop = el.find(".dropdown"),
			dropdownItem = el.find(".dropdown-item"),
			target = el.children(".dropdown-current"),
			select = el.find("select");

		el.off().on("click", function() {
			if ( type == "drop" ) {
				if ( !el.hasClass("active") ) {
					$(".dropdown-wrapper").removeClass("active");
					el.addClass("active");

					if ( pageBottom >= el.offset().top + drop.height() + 55 ) {
						drop.removeClass("bound").addClass("default");
					} else {
						drop.removeClass("default").addClass("bound");
					}

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
			select.val(value).trigger("change");

			$(this).addClass("active").parents("form.auto-send").submit();
		});

		select.on("change", function() {
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

function initDropdowns() {
	if ( $("select").length ) {
		$("select").each(function(i) {
			buildDropdowns(i);
		});

		// Detect dropdown window fit

		$(window).on("scroll", function() {
			var el = $(".dropdown-wrapper.active"),
				drop = el.find(".dropdown");

			if ( el.length && pageBottom >= el.offset().top + drop.height() + 55 ) {
				drop.removeClass("bound").addClass("default");
			} else {
				drop.removeClass("default").addClass("bound");
			}
		});

		if ( config.application.debug ) console.log("Form :: Dropdowns");
	}
}




function loadFileInputs() {
	if ( $(".file-wrapper").length ) {
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

		if ( config.application.debug ) console.log("Form :: File Upload");
	}


	// Multiple Upload

	if ( $(".multifile-wrapper").length ) {
		var el = $(".multifile-wrapper"),
			inputCount = el.length,
			inputLimit = config.forms.uploadlimit,
			limitElement = $(".multi-limit"),
			currentCount = inputLimit - el.find(".loaded").length,
			isSingular = currentCount == 1 ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(),
			newInput = '<div class="multifile-wrapper mobile-hide last">\
							<input type="file" id="file' + "[" + inputCount + "]" + '" name="file' + "[" + inputCount + "]" + '" />\
							<div class="fakefile">\
								<div class="button primary fake-upload">Choose File</div>\
								<div class="file-result">No file chosen</div>\
								<div class="button primary fake-close">&times;</div>\
							</div>\
						</div>';

		limitElement.html(currentCount);

		el.each(function(i) {
			var el = $(this);
			var resultElement = el.find(".file-result");

			el.find("input").attr("id", "file" + "[" + i + "]").attr("name", "file" + "[" + i + "]");

			el
			.off("click")
			.on("click", ".fake-upload", function() {
				el.find("input").trigger("click");
			})
			.on("click", ".fake-close", function() {
				if ( inputCount == inputLimit && !$(".multifile-wrapper.last").length ) $(newInput).insertAfter($(".multifile-wrapper").eq(inputCount - 1));
				el.remove();
				loadFileInputs(inputLimit);
			})
			.off("change")
			.on("change", "input", function() {
				var text = $(this).val().replace("C:\\fakepath\\", "");
				resultElement.html(text).addClass('loaded');

				if ( inputCount < inputLimit ) $(newInput).insertAfter(el);
				loadFileInputs(inputLimit);
				if ( i < inputCount ) el.removeClass("last");
			});
		});

		if ( config.application.debug ) console.log("Form :: Multiple File Upload");
	}
}




function loadProgressBar() {
	if ( $("progress").length ) {
		function triggerProgress(progress) {
			var el = $("progress"),
				label = el.prev("label"),
				bar = el.find(".progress-bar span");

			bar.width(progress + "%").html(progress + "%");
			label.removeClass("active").width(progress + "%").attr("data-progress", progress);
			el.removeClass("valid").attr("value", progress);

			if ( progress >= 10 ) label.addClass("active");
			if ( progress >= 100 ) el.addClass("valid");
		}

		$("[data-progress]").on("click", function(event) {
			var progress = 0;
			clearInterval(progressInterval);

			var progressInterval = setInterval(function() {
				if ( progress < 100 ) {
					progress++;
					triggerProgress(progress);
					console.log(progress);
				} else {
					$(".progress").addClass("valid");
					clearInterval(progressInterval);
				}
			}, 300);
		});

		if ( config.application.debug ) console.log("Form :: Progress Bar");
	}
}




$(window).load(function() {

	// Datepicker

	$("input[data-calendar='true']").datepicker({
		autoclose: true,
		format: "dd/mm/yyyy",
		todayBtn: "linked",
		todayHighlight: true,
		startDate: new Date()
	});

	$(".input-daterange").datepicker({
		autoclose: true,
		format: "dd/mm/yyyy",
		todayBtn: "linked",
		todayHighlight: true,
		startDate: new Date()
	});

});
