// Konami Easter Egg

var initKonami = function(callback) {
	var userCode = [],
		userString = "",
		konamiCoding = false;

	var buildKonami = function() {
		var img = '<img class="konami" style="width: 100%;" src="scripts/core/konami/contra.gif">';
		$(".main").prepend(img);
	}

	var resetKonami = function() {
		userCode = [];
		userString = "";
		konamiCoding = false;

		$(".konami").remove();
	}

	var callKonami = function(event) {
		var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
		var konamiString = konamiCode.join(", ");

		if ( event.keyCode == 38 ) konamiCoding = true;

		if ( konamiCoding && userString.length <= konamiString.length ) {
			if ( userString.indexOf(konamiString) == -1 ) {
				userCode.push(event.keyCode);
				userString = userCode.join(", ");
			}

			if ( userString.indexOf(konamiString) != -1 ) {
				console.log("Easter Egg :: Konami!");
				resetKonami();
				buildKonami();

				if ( event.keyCode == 27 ) {
					resetKonami();
				}
			}
		} else {
			resetKonami();
		}
	}

	$(document).on("keyup", callKonami);

	if ( config.application.debug ) console.log("Widget :: Konami");
}