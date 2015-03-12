function initForm() {
	// Country Dropdowns

	if ( $("select[data-countries]").length ) {
		$("select[data-countries]").each(function() {
			var el = $(this),
				url = el.data("countries");

			function buildCountries(data) {
				for (var i = 0; i < data.length; i++ ) {
					var name = data[i].Name,
						code = data[i].Code,
						option = "<option value='" + code + "'>" + name + "</option>";

					el.append(option);
				}

				initDropdowns();
			}

			dataRequest(url, "GET", buildCountries);
		});

		if ( config.application.debug ) console.log("Form :: Country Dropdowns");
	}



	// File Inputs

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



	// Checkboxes, Radio buttons & Toggles

	if ( $("input[type='checkbox']").length ) {
		$("input[type='checkbox']").each(function() {
			var el = $(this);
			el.wrap("<div class='controller checkbox'></div>");
			var parent = el.parents(".controller");
			parent.next("label").prepend(toggle).appendTo(parent);
		});

		if ( config.application.debug ) console.log("Form :: Checkboxes");
	}

	if ( $("input[type='radio']").length ) {
		$("input[type='radio']").each(function() {
			var el = $(this);
			el.wrap("<div class='controller radio'></div>");
			var parent = el.parents(".controller");
			parent.next("label").prepend(toggle).appendTo(parent);
		});

		if ( config.application.debug ) console.log("Form :: Radio buttons");
	}

	if ( $("input[type='togglecheckbox']").length ) {
		var toggle = '<span class="toggle-body">
							<span class="toggle-switch"></span>
							<span class="toggle-track">
							<span class="toggle-background"></span>
								<span class="toggle-background toggle-background-negative"></span>
							</span>
						</span>';

		$("input[type='togglecheckbox']").each(function() {
			var el = $(this);
			el.attr("type", "checkbox").wrap("<div class='controller toggle'></div>");
			var parent = el.parents(".controller");
			parent.next("label").prepend(toggle).appendTo(parent);
		});

		if ( config.application.debug ) console.log("Form :: Toggles");
	}

	if ( $("input[type='toggleradio']").length ) {
		var toggle = '<span class="toggle-body">
							<span class="toggle-switch"></span>
							<span class="toggle-track">
							<span class="toggle-background"></span>
								<span class="toggle-background toggle-background-negative"></span>
							</span>
						</span>';

		$("input[type='toggleradio']").each(function() {
			var el = $(this);
			el.attr("type", "radio").wrap("<div class='controller toggle'></div>");
			var parent = el.parents(".controller");
			parent.next("label").prepend(toggle).appendTo(parent);
		});

		if ( config.application.debug ) console.log("Form :: Toggles");
	}

	$(document).on("click", "input[type='checkbox'][readonly], input[type='radio'][readonly]", function(event) {
		event.preventDefault();
	});



	// Password Meters

	if ( $("input[type='password']").length ) {
		var wrapper = '<div class="password-wrapper"></div>',
			meter = '<div class="password-meter-mask"><div class="password-meter"></div></div>';

		$("input[type='password']").each(function() {
			var el = $(this);

			if ( el.data("validation") !== "match" ) {
				el.wrap(wrapper);
				$(meter).insertAfter(el);
			}
		});

		if ( config.application.debug ) console.log("Form :: Password Meters");
	}



	// Progress Bars

	if ( $("progress").length ) {
		function triggerProgress(progress) {
			var el = $("progress"),
				label = el.prev("label"),
				bar = el.find(".progress-bar span");

			bar.width(progress + "%").html(progress + "%");
			label.removeClass("active").width(progress + "%").attr("data-progress", progress);
			el.removeClass("valid").attr("value", progress);

			if ( progress >= 8 ) label.addClass("active");
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

function initDropdowns() {
	if ( $("select").length ) {
		function buildDropdowns(i) {
			var select = $("select").eq(i),
				size = size == "undefined" || size === "" ? 1 : parseInt(select.attr("size"), 10),
				type = typeof size !== "undefined" && size !== "" && size > 1 ? "list" : "drop",
				placeholder = select.attr("placeholder"),
				option = select.children("option").not("[default]"),
				selected = select.children("option:selected"),
				wrapper = '<div class="dropdown-' + i + ' dropdown-wrapper ' + type + '" data-size="' + size + '"></div>',
				widget = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + '</div>\
						  <div class="dropdown-arrow valign-middle">\
							  <img class="svg icon icon-caret-down" src="img/icons/icon-caret-down.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-down.png\'">\
						  </div>\
						  <div class="dropdown"></div>';


			// Build structure

			if ( $(".dropdown-" + i).length ) select.insertAfter($(".dropdown-" + i));
			$(".dropdown-" + i).remove();
			select.wrap(wrapper);

			var dropWrapper = $(".dropdown-" + i);
			dropWrapper.children(".dropdown-current").remove();
			dropWrapper.children(".dropdown-arrow").remove();
			dropWrapper.children(".dropdown").remove();
			dropWrapper.append(widget);

			option.each(function() {
				var option = $(this),
					isSelected = option.is(":selected") ? "active" : "",
					item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + '</div>';

				dropWrapper.children(".dropdown").append(item);
			});

			if ( type == "list" ) {
				dropWrapper.children(".dropdown").height(((dropWrapper.find(".dropdown-item").outerHeight() + 1) * size) - 1);
			}


			// Click Event

			dropWrapper.each(function() {
				var el = $(this),
					dropdown = el.children(".dropdown"),
					dropItem = dropdown.children(".dropdown-item"),
					target = el.children(".dropdown-current");

				target.attr("class", "dropdown-current " + select.attr("class"));

				if ( select.is('[readonly]') ) {
					el.addClass("readonly");
					target.attr("readonly", true);
				} else if ( select.is('[disabled]') ) {
					el.addClass("disabled");
					target.attr("disabled", true);
				} else {
					function reveal() {
						if ( type == "drop" ) {
							$(".dropdown-wrapper").removeClass("active");

							if ( !el.hasClass("active") ) {
								el.addClass("active");

								if ( pageBottom >= el.offset().top + dropdown.height() + 55 ) {
									dropdown.removeClass("bound").addClass("default");
								} else {
									dropdown.removeClass("default").addClass("bound");
								}
							}
						}
					}

					el.off().on("click", function() {
						select.trigger("focus");
					});

					dropItem.off().on("click", function() {
						var value = $(this).attr("data-value");
						select.val(value).trigger("change");
					});

					select.on("focus", function() {
						reveal();
					}).on("change", function() {
						var selected = $(this).children("option:selected");

						dropItem.removeClass("active");
						if ( !select.hasClass("keep") ) target.text(selected.text()).attr("data-value", selected.val());

						for ( var i = 0; i < dropItem.length; i++ ) {
							if ( dropItem.eq(i).text() === selected.text() ) {
								dropItem.eq(i).addClass("active").parents("form.auto-send").submit();
							}
						}
					});
				}
			});

			$("html, body").off().on("click", function(event) {
				if ( !$(event.target).closest(".dropdown").length &&!$(event.target).closest(".dropdown-wrapper").length && $(".dropdown-wrapper").hasClass("active") ) {
					$(".dropdown-wrapper").removeClass("active");
				}
			});
		}

		$("select").each(function(i) {
			buildDropdowns(i);
		});


		// Detect dropdown window fit

		$(window).on("scroll", function() {
			var el = $(".dropdown-wrapper.active"),
				drop = el.children(".dropdown");

			if ( el.length && pageBottom >= el.offset().top + drop.height() + 55 ) {
				drop.removeClass("bound").addClass("default");
			} else {
				drop.removeClass("default").addClass("bound");
			}
		});

		if ( config.application.debug ) console.log("Form :: Dropdowns");

		initSVGs();
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
