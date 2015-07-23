// Validation

var initValidation = function() {
	if ( config.forms.validation && $("[data-validation]").length ) {

		// Password Check

		var scorePassword = function(pwd) {
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
		}


		// Credit Card checks

		var detectCard = function(number) {
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
		}



		// Validation function called on keyup

		var validateField = function(el, type, value) {
			if ( config.application.debug ) console.log("Validation :: " + type);

			el.removeClass("invalid").removeClass("valid");

			switch(type) {
				case "text":
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
					if ( scorePassword(value) >= 30 ) {
						el.addClass("valid");
					} else {
						el.addClass("invalid");
					}

				break;

				case "match":
					type = el.attr("type");
					var mirror = el.parents().find("input[type='" + type + "']");
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

					$(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + detectCard(value) + ".png");

				break;


				case "date":
					check = /^\d{2}\/\d{2}\/\d{4}$/;

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

						el.find("[data-validation='date']").datepicker("remove");
						el.find("input, select, textarea").attr("readonly", "readonly");
						el.find("button, input[type='submit']").attr("readonly", "readonly");

						initDropdowns();

						el.find(".form-loader").hide();
						el.find(".form-done").show();

						// el.submit();
						notify("Form submitted successfully.", "success", 3000);
					} else {
						el.removeClass("valid");

						el.find("[required]:not('.valid')").addClass("invalid");

						el.find(".form-loader").hide();
						el.find("button, input[type='submit']").show();

						notify("Form not submitted. Please review.", "failure", 3000);
					}
			}
		}

		var validateRealtime = function(el, type, value) {
			console.log("Validating keypress for " + type);

			switch(type) {
				case "password":
					el.next(".password-meter-mask").width(scorePassword(value) + "%").find(".password-meter").width(el.outerWidth());
				break;

				case "card":
					$(".card-wrapper .card").attr("src", "img/icons/payment/cards/" + detectCard(value) + ".png");
				break;
			}
		}


		// Validation Input Behaviour

		$("input[data-validate-key]").on("keyup", function() {
			var el = $(this),
				type = el.attr("data-validation"),
				value = el.val();

			validateRealtime(el, type, value);
		});

		$("form[data-validation]").each(function() {
			var form = $(this);

			form.find("[required]").each(function() {
				var el = $(this);

				if ( el.attr("type") === "checkbox" || el.attr("type") === "radio" ) {
					el.on("change", function() {
						var type = el.attr("data-validation"),
							value = el.val();

						validateField(el, type, value);
					}).next("label").append("<span class='indicator-required'></span>");
				} else {
					el.on("keyup", function() {
						el.removeClass("valid").removeClass("invalid");
					})
					.on("focus", function() {
						var type = el.attr("data-validation"),
							value = el.val();

						if ( type == "select" ) el.next(".dropdown-current").removeClass("valid").removeClass("invalid");
						if ( $(this).hasClass("invalid") ) validateField(el, type, value);
					}).on("blur", function() {
						setTimeout(function() {
							var type = el.attr("data-validation"),
								value = el.val();

							validateField(el, type, value);
						}, 200);
					}).prev("label").append("<span class='indicator-required'></span>");
				}
			});

			form.on("submit", function(event) {
				form.find("[required]").each(function() {
					var elem = $(this),
						type = elem.attr("data-validation"),
						value = elem.val();

					validateField(elem, type, value);
				});

				if ( !form.hasClass("submitted") ) {
					var type = form.attr("data-validation"),
						value = "";

					form.find("button, input[type='submit']").hide();
					form.find(".form-loader").show();

					event.preventDefault();
					validateField(form, type, value);
				}
			});
		});

		if ( config.application.debug ) console.log("Form :: Validation");
	}
}