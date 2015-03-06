function initValidation() {
	if ( config.forms.validation && $("[data-validation]").length ) {

		// Password Check

		function scorePassword(pwd) {
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


		// Validation function called on keyup

		function validateKeypress(el, type, value) {
			console.log("Validating keypress for " + type);

			switch(type) {
				case "password":
					el.next(".password-meter-mask").width(scorePassword(value) + "%").find(".password-meter").width(el.outerWidth());
					break;
			}
		}

		$("input[data-validation='password']").on("keyup", function() {
			var el = $(this),
				type = el.attr("data-validation"),
				value = el.val();

			validateKeypress(el, type, value);
		});


		function validate(el, type, value) {
			if ( config.application.debug ) console.log("Validation :: " + type);

			el.removeClass("invalid").removeClass("valid");

			switch(type) {
				case "text":
					value !== "" ? el.addClass("valid") : el.addClass("invalid");
					break;

				case "number":
					var check = /\D+/;
					value !== "" && value.length == value.replace(check, '').length ? el.addClass("valid") : el.addClass("invalid");
					break;


				case "email":
					var check = /^\S+@\S+\.\S+$/;
					value !== "" && check.test(value) ? el.addClass("valid") : el.addClass("invalid");
					break;

				case "password":
					scorePassword(value) >= 30 ? el.addClass("valid") : el.addClass("invalid");
					break;

				case "match":
					var type = el.attr("type");
					var mirror = el.parents().find("input[type='" + type + "']");
					var check = mirror.val();

					mirror.hasClass("valid") && value === check ? el.addClass("valid") : el.addClass("invalid");
					break;


				case "date":
					var check = /^\d{2}\/\d{2}\/\d{4}$/;
					value !== "" && check.test(value) ? el.addClass("valid") : el.addClass("invalid");
					break;


				default:
					var validArray = [];
					var progress = 0;

					el.find("[required]").each(function() {
						$(this).hasClass("valid") ? validArray.push(true) : validArray.push(false);
					});

					if ( validArray.indexOf(false) < 0 ) {
						submitted = true;
						el.addClass("valid");

						el.find("[data-validation='date']").datepicker("remove");
						el.find("[required]").prop("readonly", true);
						el.find("button").prop("readonly", true);

						el.find(".form-loader").hide();
						el.find(".form-done").show();

						// el.submit();
						notify("Form submitted successfully.", "success", 3000);
					} else {
						el.removeClass("valid");

						el.find("[required]:not('.valid')").addClass("invalid");

						el.find(".form-loader").hide();
						el.find("button").show();

						notify("Form not submitted. Please review.", "failure", 3000);
					}
			}
		}


		var submitted = false;

		$("form[data-validation]").each(function() {
			var form = $(this);

			form.find("[required]").each(function() {
				$(this).prev("label").append(" *");
				$(this).on("keyup", function() {
						$(this).removeClass("valid").removeClass("invalid");
					})
					.on("focus", function() {
						var el = $(this),
							type = el.attr("data-validation"),
							value = el.val();

						if ( $(this).hasClass("invalid") ) validate(el, type, value);
					}).on("blur", function() {
						var el = $(this);

						setTimeout(function() {
							var type = el.attr("data-validation"),
								value = el.val();

							validate(el, type, value);
						}, 200);
					});
			});

			form.on("submit", function(event) {
				form.find("[required]").each(function() {
					var el = $(this),
						type = el.attr("data-validation"),
						value = el.val();

					validate(el, type, value);
				});

				if ( !submitted ) {
					var type = form.attr("data-validation"),
						value = "";

					form.find("button").hide();
					form.find(".form-loader").show();

					event.preventDefault();
					validate(form, type, value);
				}
			});
		});

		if ( config.application.debug ) console.log("Form :: Validation");
	}
}