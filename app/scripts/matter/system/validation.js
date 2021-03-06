// Validation

matter.validation = {
	scorePassword: function(pwd) {
		var score = 0;
		if (!pwd)
			return score;

		// Award every unique letter until 5 repetitions
		var letters = {};
		for ( var i = 0; i < pwd.length; i++ ) {
			letters[pwd[i]] = (letters[pwd[i]] || 0) + 1;
			score += 5.0 / letters[pwd[i]];
		}

		// Bonus points for mixing it up
		var variations = {
			digits: /\d/.test(pwd),
			lower: /[a-z]/.test(pwd),
			upper: /[A-Z]/.test(pwd),
			nonWords: /\W/.test(pwd)
		};

		variationCount = 0;
		for ( var check in variations ) {
			variationCount += (variations[check] === true) ? 1 : 0;
		}
		score += (variationCount - 1) * 10;

		return parseInt(score, 10);

		// score > 80 is "strong", score > 60 is "good", score >= 30 is "weak"
	},

	detectCard: function(number) {
		var regex = {
			amex: /^3[47][0-9]{13}$/,
			dankort: /^(5019)\d+$/,
			diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
			electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
			interpayment: /^(636)\d+$/,
			jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
			maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
			mastercard: /^5[1-5][0-9]{14}$/,
			unionpay: /^(62|88)\d+$/,
			visa: /^4[0-9]{12}(?:[0-9]{3})?$/
		};

		if ( regex.amex.test(number) ) {
			return 'american-express';
		} else if ( regex.dankort.test(number) ) {
			return 'dankort';
		} else if ( regex.diners.test(number) ) {
			return 'diners';
		} else if ( regex.discover.test(number) ) {
			return 'discover';
		} else if ( regex.electron.test(number) ) {
			return 'visa-electron';
		} else if ( regex.interpayment.test(number) ) {
			return 'interpayment';
		} else if ( regex.jcb.test(number) ) {
			return 'jcb';
		} else if ( regex.maestro.test(number) ) {
			return 'maestro';
		} else if ( regex.mastercard.test(number) ) {
			return 'mastercard';
		} else if ( regex.unionpay.test(number) ) {
			return 'unionpay';
		} else if ( regex.visa.test(number) ) {
			return 'visa';
		} else {
			return 'generic';
		}
	},

	sanitize: function(value) {
		var check = /[^!?,.'":\-\w\s]/gi;
		return value.replace(check, '');
	},

	validateField: function(el, type, value) {
		debug.log("== Validating on blur for " + type);

		el.removeClass("invalid").removeClass("valid");

		switch(type) {
			case "text":
				value = matter.validation.sanitize(value);
				el.val(value);

				if ( value !== "" ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;

			case "number":
				check = /\D+/;

				if ( value !== "" && value.length == value.replace(check, '').length ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;


			case "email":
				check = /^\S+@\S+\.\S+$/;

				if ( value !== "" && check.test(value) ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;

			case "password":
				// At least one uppercase letter, one lowercase letter and one number. Special characters are optional, some are blacklisted (!@#$%^&*()_|+~\=?;:'")
				check = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_|+~\=?;:'"<>]{8,}$/;

				if ( value !== "" && check.test(value) ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
					matter.notification.call("Password requirements", "Minimum of 8 characters, at least one uppercase letter, one lowercase letter, AND one number.")
				}
			break;

			case "match":
				var name = el.attr("name");
				var mirror = el.parents().find("[name='" + name + "']");
				check = mirror.val();

				if ( mirror.hasClass("valid") && value === check ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;


			case "card":
				if ( value !== "" ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}

				el.prev('img').attr("src", matter.config.application.base + "img/icons/cards/" + matter.validation.detectCard(value) + ".png");
			break;


			case "date":
				check = /^\d{4}\-\d{2}\-\d{2}$/;

        console.log(value, check.test(value));

				if (value !== "" && check.test(value) ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;


			case "select":
				if (value !== "" ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}

				el.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + el.attr("class"));
			break;

			case "selectgroup":
				group = el.data("validation-group");
				var selects = $("select[data-validation-group='" + group + "']"),
					selectGroup = {};

				selectGroup[group] = [];

				selects.removeClass("invalid").each(function() {
					var checked = value !== "";
					selectGroup[group].push(checked);
				});

				if (selectGroup[group].indexOf(true) != -1 ) {
					selects.addClass("valid");
				} else {
					selects.addClass("invalid");
				}

				selects.parents(".dropdown-wrapper").children(".dropdown-current").attr("class", "dropdown-current " + el.attr("class"));
			break;



			case "checkbox":
				if (el.prop("checked") ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}
			break;

			case "radio":
				group = el.attr("name");
				var radios = $("input[type='radio'][name='" + group + "']"),
					radioGroup = {};

				radioGroup[group] = [];

				radios.removeClass("invalid").each(function() {
					var checked = $(this).prop("checked");
					radioGroup[group].push(checked);
				});

				if (radioGroup[group].indexOf(true) != -1 ) {
					radios.addClass("valid");
				} else {
					radios.addClass("invalid");
				}
			break;


			case "file":
				if (value !== "" ) {
					el.addClass("valid");
				} else {
					el.addClass("invalid");
				}

				el.parents(".file-wrapper").children(".fakefile").attr("class", "fakefile " + el.attr("class"));
			break;


			default:
				var validArray = [];
				var progress = 0;

				el.find("[required]").each(function() {
					if ($(this).hasClass("valid") ) {
						validArray.push(true);
					} else {
						validArray.push(false);
					}
				});

				if ( validArray.indexOf(false) < 0 ) {
					el.addClass("submitted").addClass("valid");

					el.find("input, select, textarea").attr("readonly", "readonly");
					el.find("button, input[type='submit']").attr("readonly", "readonly");

					matter.form.dropdowns();

					el.find(".form-loader").hide();
					el.find(".form-done").show();

					el.submit();
					matter.notification.call("Success", "Form submitted successfully.", matter.config.notification.delay, "success");
				} else {
					el.removeClass("valid");

					el.find("[required]:not('.valid')").addClass("invalid");

					el.find(".form-loader").hide();
					el.find("button, input[type='submit']").show();

					matter.notification.call("Form not submitted", "Please review your details and try again.", matter.config.notification.delay, "failure");
				}
		}
	},

	validateRealtime: function(el, type, value) {
		debug.log("== Validating keypress for " + type);

		switch(type) {
			case "password":
				el
					.next(".password-meter-mask")
					.width(matter.validation.scorePassword(value) + "%").find(".password-meter")
					.width(el.outerWidth());
			break;

			case "card":
				el.prev('img').attr("src", matter.config.application.base + "img/icons/cards/" + matter.validation.detectCard(value) + ".png");
			break;
		}
	},

	init: function() {
		if ( matter.config.forms.validation && $("[data-validation]").length ) {
			$("input[data-validate-key]").on("keyup", function() {
				var el = $(this),
					type = el.attr("data-validation"),
					value = el.val();

				matter.validation.validateRealtime(el, type, value);
			});

			$("form[data-validation]").each(function() {
				var form = $(this);

				form.find("[required]").each(function() {
					var el = $(this);

					if ( el.attr("type") === "checkbox" || el.attr("type") === "radio" ) {
						$("label[for='" + el.attr("id") + "']").addClass("required");

						el.on("change", function() {
							var type = el.attr("data-validation"),
								value = el.val();

							matter.validation.validateField(el, type, value);
						});
					} else {
						$("label[for='" + el.attr("id") + "']").addClass("required");

						el.on("keyup", function() {
							el.removeClass("valid").removeClass("invalid");
						})
						.on("focus", function() {
							var type = el.attr("data-validation"),
								value = el.val();

							if ( type == "select" ) el.next(".dropdown-current").removeClass("valid").removeClass("invalid");
							if ( $(this).hasClass("invalid") ) matter.validation.validateField(el, type, value);
						}).on("blur", function() {
							setTimeout(function() {
								var type = el.attr("data-validation"),
									value = el.val();

								matter.validation.validateField(el, type, value);
							}, 100);
						});
					}
				});

				form.on("submit", function(event) {
					form.find("[required]").each(function() {
						var elem = $(this),
							type = elem.attr("data-validation"),
							value = elem.val();

						matter.validation.validateField(elem, type, value);
					});

					if ( !form.hasClass("submitted") ) {
						var type = form.attr("data-validation"),
							value = "";

						form.find("button, input[type='submit']").hide();
						form.find(".form-loader").show();

						event.preventDefault();
						event.stopImmediatePropagation();
						matter.validation.validateField(form, type, value);
					}
				});
			});

			debug.log(":: Validation");
		}
	}
}