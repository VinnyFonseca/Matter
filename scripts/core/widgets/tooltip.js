// Tooltips

function initTooltips() {
	if ( $("[data-tooltip]").length ) {
		$("[data-tooltip]").each(function() {
			var el = $(this),
				tooltipData = el.data("tooltip"),
				container = $(".tooltip");

			if ( !config.application.touch ) {
				el
					.on("mousemove", function(event) {
						container.html(tooltipData).addClass("active");

						switch(config.tooltip.position) {
							case "left":
								container.css({
									top: event.pageY - container.outerHeight() - 10,
									left: event.pageX - container.outerWidth()
								});
								break;

							case "center":
								container.css({
									top: event.pageY - container.outerHeight() - 10,
									left: event.pageX - (container.outerWidth() / 2) - 5
								});
								break;

							case "right":
								container.css({
									top: event.pageY - container.outerHeight() - 10,
									left: event.pageX
								});
								break;

							default:
								container.css({
									top: event.pageY - container.outerHeight() - 10,
									left: event.pageX - (container.outerWidth() / 2) - 5
								});
						}

						var tooltip = {
							left: container.offset().left,
							right: container.offset().left + container.outerWidth()
						};
						var boundaries = {
							left: $(".wrapper").offset().left,
							right: $(".wrapper").offset().left + $(".wrapper").outerWidth()
						};

						if ( config.tooltip.bound ) {
							if ( tooltip.left <= boundaries.left ) {
								container.css({ left: boundaries.left });
							}
							if ( tooltip.right >= boundaries.right ) {
								container.css({ left: boundaries.right - container.outerWidth() });
							}
						}
					})
					.on("mouseleave", function() {
						container.removeClass("active").css({
							left: -200,
							top: -200
						});
					});
			}
		});

		if (config.application.debug) console.log("Widget :: Tooltips");
	}
}