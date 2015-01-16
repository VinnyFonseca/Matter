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

	function validateBlur(el, type, value) {
		var notificationType = "failure";

		if (config.application.debug) console.log("Validation :: " + type);

		switch(type) {
			case "text":
				if ( value !== "" ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("This field cannot be left empty.", notificationType);
				}
				break;

			case "email":
				var check = /^\S+@\S+\.\S+$/;
				if ( value !== "" && check.test(value) ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your email is invalid.", notificationType);
				}
				break;

			case "password":
				if ( scorePassword(value) >= 30 ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your password is not strong enough.", notificationType);
				}
				break;

			case "password-match":
				var mirror = $("input[name='password-match']").eq(0);
				var password = mirror.val();

				if ( el.val() == mirror.val() ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("Your passwords must match.", notificationType);
				}

				if ( !mirror.hasClass("valid") ) {
					el.removeClass("valid").addClass("invalid");
					notify("Your password is not strong enough.", notificationType);
				}

			case "date":
				var check = /^\d{2}\/\d{2}\/\d{4}$/;
				if ( value !== "" && check.test(value) ) {
					el.removeClass("invalid").addClass("valid");
				} else {
					el.removeClass("valid").addClass("invalid");
					notify("The date you entered is not valid.", notificationType);
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
			.on("focus", function() {
				$(this).removeClass("valid").removeClass("invalid");
			}).on("blur", function() {
				var el = $(this),
					type = el.attr("data-validation"),
					value = el.val();

				validateBlur(el, type, value);
			});
	}

	if (config.application.debug) console.log("Form :: Validation");
}