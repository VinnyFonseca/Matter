function initValidation() {
	if ( config.forms.validation && $("[data-validation]").length ) {
		var submitted = false;


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
			var notificationTone = "failure",
				notificationDelay = 3000;

			if ( config.application.debug ) console.log("Validation :: " + type);

			switch(type) {
				case "text":
					if ( value !== "" ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("This field cannot be left empty.", notificationTone, notificationDelay);
					}
					break;

				case "number":
					var check = /\D+/;
					if ( value !== "" && value.length == value.replace(check, '').length ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("This field can only have numbers.", notificationTone, notificationDelay);
					}
					break;

				case "email":
					var check = /^\S+@\S+\.\S+$/;
					if ( value !== "" && check.test(value) ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("Your email is invalid.", notificationTone, notificationDelay);
					}
					break;

				case "password":
					if ( scorePassword(value) >= 30 ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("Your password is not strong enough.", notificationTone, notificationDelay);
					}
					break;

				case "password-match":
					var mirror = $("input[name='password-match']").eq(0);
					var password = mirror.val();

					if ( mirror.hasClass("valid") && value === password ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("Your passwords must match.", notificationTone, notificationDelay);
					}
					break;

				case "date":
					var check = /^\d{2}\/\d{2}\/\d{4}$/;
					if ( value !== "" && check.test(value) ) {
						el.removeClass("invalid").addClass("valid");
					} else {
						el.removeClass("valid").addClass("invalid");
						// notify("The date you entered is not valid.", notificationTone, notificationDelay);
					}
					break;

				case "form":
					var validArray = [];
					var progress = 0;

					el.find("[required]").each(function() {
						$(this).hasClass("valid") ? validArray.push(true) : validArray.push(false);
					});

					if ( validArray.indexOf(false) < 0 ) {
						el.addClass("valid");
						el.find("[required]").prop("disabled", true);
						el.find("button[type='submit']").prop("disabled", true);
						notify("Form submitted successfully.", "success", notificationDelay);

						submitted = true;
						$("form[data-validation='form']").submit();
					} else {
						el.removeClass("valid");
						el.find("[required]:not('.valid')").addClass("invalid")
						notify("Form not submitted. Please review.", notificationTone, notificationDelay);
					}
					break;
			}
		}

		$("[required]")
			.on("keyup", function() {
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




		$("form[data-validation='form']").on("submit", function() {
			var el = $(this),
				type = el.attr("data-validation"),
				value = "";

			if ( !submitted ) {
				validate(el, type, value);
				return false;
			}
		});

		if ( config.application.debug ) console.log("Form :: Validation");
	}
}