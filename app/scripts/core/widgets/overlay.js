// Overlays

var initOverlays = function() {
	if ( $("[data-overlay]").length ) {
		$("[data-overlay]").each(function() {
			var el = $(this),
				target = $("#" + el.data("overlay"));

			el.on("click", function() {
				if ( target.hasClass("active") ) {
					target.removeClass("active");
				} else {
					target.addClass("active");
				}
			});

			target.on('click', function() {
				target.removeClass("active");
			});
			target.children(".overlay-close").on('click', function() {
				target.removeClass("active");
			});
			target.children(".modal").on("click", function(event) {
				if ( !$(event.target).closest(".overlay-close").length ) event.stopPropagation();
			});
		});

		if ( config.application.debug ) console.log("Widget :: Overlays");
	}
}