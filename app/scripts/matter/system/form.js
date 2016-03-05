// Forms

var initForm = function() {
	// Country Dropdowns

	if ( $("select[data-countries]").length ) {
		$("select[data-countries]").each(function() {
			var el = $(this),
				url = el.data("countries");

			var buildCountries = function(data) {
				for (var i = 0; i < data.length; i++ ) {
					var name = data[i].Name,
						code = data[i].Code,
						option = "<option value='" + code + "'>" + name + "</option>";

					el.append(option);
				}

				initDropdowns();
			}

			matter.data.get(url, buildCountries);
		});

		if ( matter.config.application.debug ) console.log("Form :: Country Dropdowns");
	}



	// File Inputs

	var singleFileWrapper = '<div class="file-wrapper mobile-hide"></div>';
	var singleFileFake = '<div class="fakefile">\
							<div class="button primary fake-upload">Choose File</div>\
							<div class="file-result">No file chosen</div>\
						</div>';

	var multiFileIntro = '<div class="multifile-info form-info">\
							You\'ve got <strong class="emphasis multi-limit font-medium">0</strong> remaining upload<span class="plural">s</span>.\
						</div>';
	var multiFileWrapper = '<div class="multifile-wrapper mobile-hide last"></div>';
	var multiFileFake = '<div class="fakefile">\
							<div class="button primary fake-upload">Choose File</div>\
							<div class="file-result">No file chosen</div>\
							<div class="button primary fake-close">\
								<img class="svg icon icon-close" src="/img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'/img/icons/icon-close.png\'">\
							</div>\
						</div>';

	$("input[type='file']").each(function() {
		if ( $(this).data("multi") ) {
			$(this).before(multiFileIntro).wrap(multiFileWrapper).after(multiFileFake);
		} else {
			$(this).wrap(singleFileWrapper).after(singleFileFake);
		}
	});

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

		if ( matter.config.application.debug ) console.log("Form :: File Upload");
	}

	// Multiple Upload

	if ( $(".multifile-wrapper").length ) {
		var initFileInputs = function() {
			var file = $(".multifile-wrapper"),
				inputCount = file.length,
				inputLimit = matter.config.forms.multiUploadlimit,
				limitElement = $(".multi-limit"),
				currentCount = inputLimit - file.find(".loaded").length,
				isSingular = currentCount == 1 ? $(".multifile-info").find(".plural").hide() : $(".multifile-info").find(".plural").show(),
				newInput = '<input type="file" id="file' + "[" + inputCount + "]" + '" name="file' + "[" + inputCount + "]" + '" />';

			$(newInput).wrap(multiFileWrapper).after(multiFileFake);
			limitElement.html(currentCount);

			file.each(function(i) {
				var el = $(this);
				var resultElement = el.find(".file-result");

				el.find("input").attr("id", "file" + "[" + i + "]").attr("name", "file" + "[" + i + "]");

				el
				.off()
				.on("click", ".fake-upload", function() {
					el.find("input").trigger("click");
				})
				.on("click", ".fake-close", function() {
					if ( inputCount == inputLimit && !$(".multifile-wrapper.last").length ) {
						$(newInput).insertAfter($(".multifile-wrapper").eq(inputCount - 1));
					}
					el.remove();
					initFileInputs();
				})
				.on("change", "input", function() {
					var text = $(this).val().replace("C:\\fakepath\\", "");
					resultElement.html(text).addClass('loaded');

					if ( inputCount <= inputLimit ) {
						$(newInput).insertAfter(el).wrap(multiFileWrapper).after(multiFileFake);
					}

					if ( i < inputCount ) el.removeClass("last");

					initFileInputs();
				});
			});

			matter.svg.init();
		}
		initFileInputs();

		if ( matter.config.application.debug ) console.log("Form :: Multiple File Upload");
	}



	// Checkboxes, Radio buttons & Toggles

	$(document).on("click", "[readonly]", function(event) {
		event.preventDefault();
	});

	var toggle = '<span class="toggle-body">\
					  <span class="toggle-switch"></span>\
					  <span class="toggle-track">\
					  <span class="toggle-background"></span>\
						  <span class="toggle-background toggle-background-negative"></span>\
					  </span>\
				  </span>';

	if ( $("input[type='checkbox'], input[type='radio']").length ) {
		$("input[type='checkbox'], input[type='radio']").each(function() {
			var el = $(this),
				type = el.attr("type"),
				parent = "";

			if ( el.attr("data-toggle") === "true" ) {
				el.wrap("<div class='controller toggle'></div>");
				parent = el.parents(".controller");
				parent.next("label").prepend(toggle).appendTo(parent);

				if ( matter.config.application.debug ) console.log("Form :: Toggle " + type.toCamelCase());
			} else {
				el.wrap("<div class='controller " + type + "'></div>");
				parent = el.parents(".controller");
				parent.next("label").appendTo(parent);

				if ( matter.config.application.debug ) console.log("Form :: " + type.toCamelCase());
			}
		});
	}



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

		if ( matter.config.application.debug ) console.log("Form :: Password Meters");
	}
}

var initDropdowns = function() {
	if ( $("select").length ) {
		$("select").off().each(function() {
			var select = $(this),
				size = select.attr("size")
				size = size === "undefined" || size === "" || isNaN(size) ? 1 : parseInt(size, 10),
				type = size > 1 ? "list" : "drop",
				options = select.children("option").not("[default]"),
				selected = select.children("option:selected"),
				wrapperEl = '<div class="dropdown-wrapper ' + type + '" data-size="' + size + '"></div>',
				currentEl = '<div class="dropdown-current" data-value="' + selected.val() + '">' + selected.html() + '</div>',
				arrowEl = ' <div class="dropdown-arrow valign-middle">\
								<img class="svg icon icon-caret-down" src="/img/icons/icon-caret-down.svg" onerror="this.onerror=null;this.src=\'/img/icons/icon-caret-down.png\'">\
							</div>',
				dropEl = '<div class="dropdown default"></div>';


			// Build structure

			if ( !select.parents(".dropdown-wrapper").length ) {
				select.wrap(wrapperEl);
				$(dropEl).insertAfter(select);
				$(arrowEl).insertAfter(select);
				$(currentEl).insertAfter(select);
			}

			var dropWrapper = select.parents(".dropdown-wrapper"),
				arrow = dropWrapper.children(".dropdown-arrow"),
				current = dropWrapper.children(".dropdown-current"),
				dropdown = dropWrapper.children(".dropdown");

			dropdown.html("");
			current.val(selected.val()).html(selected.html());

			for ( var i = 0; i < options.length; i++ ) {
				var option = options.eq(i),
					isSelected = option.is(":selected") ? "active" : "",
					item = '<div class="dropdown-item ' + isSelected + '" data-value="' + option.val() + '">' + option.html() + '</div>';

				dropdown.append(item);
			}

			var dropItem = dropdown.children(".dropdown-item");

			if ( type == "list" ) {
				dropdown.height(((dropWrapper.find(".dropdown-item").outerHeight() + 1) * size) - 1);
			}


			// Click Event

			var el = $(this);

			current.attr("class", "dropdown-current " + select.attr("class"));

			if ( select.is('[readonly]') ) {
				dropWrapper.addClass("readonly");
				current.attr("readonly", true);
			} else if ( select.is('[disabled]') ) {
				dropWrapper.addClass("disabled");
				current.attr("disabled", true);
			} else {
				current.off().on("click", function() {
					select.focus();
				});
				arrow.off().on("click", function() {
					select.focus();
				});

				dropItem.off().on("click", function() {
					var value = $(this).attr("data-value").trim();
					select.val(value).trigger("change");
				});

				select.on("focus", function() {
					if ( dropWrapper.hasClass("active") ) {
						$(".dropdown-wrapper").removeClass("active");
					} else {
						$(".dropdown-wrapper").removeClass("active");
						dropWrapper.addClass("active");
					}
				}).on("change", function() {
					var selected = $(this).children("option:selected");

					select.blur();
					dropWrapper.removeClass("active");
					if ( !select.hasClass("keep") ) current.text(selected.text()).attr("data-value", selected.val());
					dropItem.removeClass("active");

					for ( var i = 0; i < dropItem.length; i++ ) {
						if ( dropItem.eq(i).text() === selected.text() ) {
							dropItem.eq(i).addClass("active");
							if ( select.parents("form").hasClass("auto-send") ) select.parents("form").submit();
						}
					}
				});
			}

			$("html, body").off().on("click", function(event) {
				if (
					!$(event.target).closest(".dropdown").length &&
					!$(event.target).closest(".dropdown-wrapper.active").length
				) {
					$(".dropdown-wrapper").removeClass("active");
				}
			});
		});

		if ( matter.config.application.debug ) console.log("Form :: Dropdowns");

		matter.svg.init();
	}
}