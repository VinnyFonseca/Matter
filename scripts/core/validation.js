function initValidation() {

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

	function validate(el, type, value) {
		var notificationTone = "failure",
			notificationDelay = 3000;

		if (config.application.debug) console.log("Validation :: " + type);

		switch(type) {
			case "text":
				if ( value !== "" ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("This field cannot be left empty.", notificationTone, notificationDelay);
				}
				break;

			case "number":
				var check = /\D+/;
				if ( value.length == value.replace(check, '').length ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("This field can only have numbers.", notificationTone, notificationDelay);
				}
				break;

			case "email":
				var check = /^\S+@\S+\.\S+$/;
				if ( value !== "" && check.test(value) ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your email is invalid.", notificationTone, notificationDelay);
				}
				break;

			case "password":
				if ( scorePassword(value) >= 30 ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your password is not strong enough.", notificationTone, notificationDelay);
				}
				break;

			case "password-match":
				var mirror = $("input[name='password-match']").eq(0);
				var password = mirror.val();

				if ( mirror.hasClass("valid") && value === password ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your passwords must match.", notificationTone, notificationDelay);
				}
				break;

			case "date":
				var check = /^\d{2}\/\d{2}\/\d{4}$/;
				if ( value !== "" && check.test(value) ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("The date you entered is not valid.", notificationTone, notificationDelay);
				}
				break;
		}
	}

	if ( config.forms.validation ) {
		$("input[data-validation='password']").on("keyup", function() {
			var el = $(this),
				type = el.attr("data-validation"),
				value = el.val();

			validateKeypress(el, type, value);
		});

		$("*[required]")
			.on("keyup", function() {
				$(this).removeClass("valid").removeClass("invalid");
			})
			.on("focus", function() {
				var el = $(this),
					type = el.attr("data-validation"),
					value = el.val();

				if ( $(this).hasClass("invalid") ) validate(el, type, value);
			}).on("blur", function() {
				var el = $(this),
					type = el.attr("data-validation"),
					value = el.val();

				validate(el, type, value);
			});

		if (config.application.debug) console.log("Form :: Validation");
	}
}