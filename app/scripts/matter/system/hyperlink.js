// Hyperlinks

matter.anchor = {
	clicked: false,
	init: function() {
		$(document).on("click", "a[href^='#']", function(event) {
			event.preventDefault();

			var el = $(this);
			var link = $.attr(this, "href");

			if ( link === "#" ) {
				if ( matter.config.application.debug ) console.log("System :: Link blocked");
			} else {
				if ( !!link && !el.hasClass("step-trigger") ) {
					matter.anchor.clicked = true;

					$("html, body").animate({
						scrollTop: $(link).offset().top - 40
					}, {
						duration: 1000,
						queue: false,
						complete: function() {
							matter.anchor.clicked = false;
						}
					});

					return false;
				}
			}
		});

		if ( matter.config.application.debug ) console.log("System :: Anchors");
	}
}