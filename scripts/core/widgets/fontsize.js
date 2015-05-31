// Accessibility: Global font resizing controls

var initFontSizeControls = function() {
	if ( $(".font-control").length ) {
		var defaultSize = 10,
			fontSize = defaultSize,
			range = config.accessibility.font.range;

		if ( cookieSystem.get("fontSize") === null ) cookieSystem.set("fontSize", fontSize, 365);

		fontSize = cookieSystem.get("fontSize");
		$("html").css("font-size", fontSize + "px");

		$(".font-up").click(function() {
			if( fontSize < defaultSize + range ) fontSize++;
			cookieSystem.set("fontSize", fontSize, 365);
			fontSize = cookieSystem.get("fontSize");
			$("html").css("font-size", fontSize + "px");
		});

		$(".font-reset").click(function() {
			fontSize = defaultSize;
			cookieSystem.set("fontSize", fontSize, 365);
			fontSize = cookieSystem.get("fontSize");
			$("html").css("font-size", fontSize + "px");
		});

		$(".font-down").click(function() {
			if( fontSize > defaultSize - range ) fontSize--;
			cookieSystem.set("fontSize", fontSize, 365);
			fontSize = cookieSystem.get("fontSize");
			$("html").css("font-size", fontSize + "px");
		});

		if ( config.application.debug ) console.log("Widget :: Font Size Controls");
	}
}



// Automated responsive text resizing

var textResize = function(elem) {
	var el = $(elem);
	var charLimit = config.typography.autoresize.characters;
	var rowLimit = config.typography.autoresize.rows;
	var minFontSize = config.typography.autoresize.minFontSize;
	var maxFontSize = config.typography.autoresize.maxFontSize;
	var fontSize = minFontSize;

	var stringRebuild = (function() {
		if ( !el.hasClass("rebuilt") ) {
			var string = el.text();

			if ( !el.children("span").length ) el.empty().append("<span>" + string + "</span>");

			var span = el.children("span");
			var stringContent = span.text().trim();
			var stringLength = stringContent.length;
			var stringFinal = "";
			var stringHalf = Math.round(stringLength / 2);
			var spaceFound = false;

			if ( stringLength > charLimit && rowLimit > 1 ) {
				for ( var i = 0; i < stringLength; i++ ) {
					if ( !spaceFound && i > stringHalf && /\s/.test(stringContent[i]) ) {
						stringFinal += "<span>&#32;</span>";
						spaceFound = true;
					} else {
						stringFinal += stringContent[i];
					}
				}

				span.html(stringFinal);
			}

			el.addClass("rebuilt");
		}
	})();

	var stringResize = (function() {
		do {
			fontSize--;
			el.css('font-size', fontSize.toString() + 'px');
		} while (el.children("span").width() > el.width() && fontSize >= minFontSize);

		do {
			fontSize++;
			el.css('font-size', fontSize.toString() + 'px');
		} while (el.children("span").width() < el.width() && fontSize <= maxFontSize);

		if ( !el.hasClass("resized") ) el.addClass("resized");
	})();
}