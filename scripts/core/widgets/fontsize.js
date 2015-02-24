// Accessibility

function initFontSizeControls() {
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

		if (config.application.debug) console.log("Widget :: Font Size Controls");
	}
}