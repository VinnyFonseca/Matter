// Overlays

matter.overlay = {
	init: function() {
		if ( $(".overlay").length ) {
			$(document).on("click", "[data-overlay]", function() {
				var el = $(this);
				var target = $("#" + el.data("overlay"));

				if ( target.hasClass("active") ) {
					matter.overlay.close(target);
				} else {
					matter.overlay.open(target);
				}

				target.on('click', function(event) {
					if ( !$(event.target).closest(target.find(".modal")).length ) {
						matter.overlay.close(target);
					}
				});

				target.find(".overlay-close").on('click', function() {
					matter.overlay.close(target);
				});
			});

			if ( config.application.debug ) console.log(":: Overlays");
		}
	},
	open: function(element) {
		$("html, body").addClass("static");
		$(element).addClass("active");
	},
	close: function(element) {
		$("html, body").removeClass("static");
		$(element).removeClass("active");
	}
}