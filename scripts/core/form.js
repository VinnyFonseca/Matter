function buildDropdowns(i) {
	var el = $("select").eq(i),
		size = size == "undefined" || size === "" ? 1 : parseInt(el.attr("size"), 10),
		type = typeof size !== "undefined" && size !== "" && size > 1 ? "list" : "drop",
		option = el.find("option").not(".placeholder"),
		selected = el.find("option:selected"),
		wrapper = '<div class="dropdown-' + i + ' dropdown-wrapper ' + type + '" data-size="' + size + '"></div>',
		arrowEl = '<div class="dropdown-arrow valign-middle"><span>&#9660;</span></div>',
		currentEl = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + '</div>',
		dropdownEl = '<div class="dropdown"></div>';


	// Build structure

	if ( $(".dropdown-" + i).length ) el.insertAfter($(".dropdown-" + i));
	$(".dropdown-" + i).remove();

	el.wrap(wrapper);

	var dropdown = $(".dropdown-" + i);

	dropdown.find(".dropdown").remove();
	dropdown.find(".dropdown-arrow").remove();
	dropdown.find(".dropdown-current").remove();
	$(".dropdown-" + i).prepend(dropdownEl).prepend(arrowEl).prepend(currentEl);

	option.each(function() {
		var option = $(this),
			isSelected = option.is(":selected") ? "active" : "",
			item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + '</div>';

		dropdown.find(".dropdown").append(item);
	});

	if ( type == "list" ) {
		dropdown.find(".dropdown").height(((dropdown.find(".dropdown-item").outerHeight() + 1) * size) - 1);
	}


	// Click Event

	dropdown.each(function() {
		var drop = $(this),
			dropFake = drop.find(".dropdown"),
			dropItem = drop.find(".dropdown-item"),
			target = drop.children(".dropdown-current");

		drop.off().on("click", function() {
			if ( type == "drop" ) {
				if ( !drop.hasClass("active") ) {
					$(".dropdown-wrapper").removeClass("active");
					drop.addClass("active");

					if ( pageBottom >= drop.offset().top + dropFake.height() + 55 ) {
						dropFake.removeClass("bound").addClass("default");
					} else {
						dropFake.removeClass("default").addClass("bound");
					}

					el.focus();
				} else {
					$(".dropdown-wrapper").removeClass("active");
					el.blur();
				}
			}
		});

		dropItem.off().on("click", function() {
			var value = $(this).attr("data-value");
			el.val(value).trigger("change");
		});

		el.on("change", function() {
			var selected = $(this).children("option:selected");

			dropItem.removeClass("active");
			if ( !el.hasClass("keep") ) target.text(selected.text()).attr("data-value", selected.val());

			for ( var i = 0; i < dropItem.length; i++ ) {
				if ( dropItem.eq(i).text() === selected.text() ) {
					dropItem.eq(i).addClass("active").parents("form.auto-send").submit();
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
