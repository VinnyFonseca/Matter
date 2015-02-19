// Tooltips

function initOverlays() {
	$("[data-overlay]").each(function() {
		var el = $(this),
			target = $("#" + el.data("overlay-id"));

		el.on("click", function() {
			target.hasClass("active") ? target.removeClass("active") : target.addClass("active");
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

	if (config.application.debug) console.log("Init :: Overlays");
}