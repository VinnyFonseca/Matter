// Tooltips

function initTooltips() {
	if ( $("[data-tooltip]").length ) {
		$("[data-tooltip]").each(function() {
			var el = $(this),
				tooltipData = el.data("tooltip"),
				container = $(".tooltip");

			el
				.on("mouseover touchstart", function() {
					$(this).on("mousemove touchmove", function(event) {
						var cursorX = event.pageX || e.originalEvent.touches[0].pageX,
							cursorY = event.pageY || e.originalEvent.touches[0].pageY;

						container.html(tooltipData).addClass("active");

						switch(config.tooltip.position) {
							case "left":
								container.css({
									top: cursorY - container.outerHeight() - 10,
									left: cursorX - container.outerWidth()
								});
								break;

							case "center":
								container.css({
									top: cursorY - container.outerHeight() - 10,
									left: cursorX - (container.outerWidth() / 2) - 5
								});
								break;

							case "right":
								container.css({
									top: cursorY - container.outerHeight() - 10,
									left: cursorX
								});
								break;

							default:
								container.css({
									top: cursorY - container.outerHeight() - 10,
									left: cursorX - (container.outerWidth() / 2) - 5
								});
						}

						var tooltip = {
							left: container.offset().left,
							right: container.offset().left + container.outerWidth()
						};
						var boundaries = {
							left: $(".wrapper").offset().left + 20,
							right: $(".wrapper").offset().left + $(".wrapper").outerWidth() - 20
						};

						if ( config.tooltip.bound ) {
							if ( tooltip.left <= boundaries.left ) {
								container.css({ left: boundaries.left });
							}
							if ( tooltip.right >= boundaries.right ) {
								container.css({ left: boundaries.right - container.outerWidth() });
							}
						}
					});
				})
				.on("mouseout touchend", function() {
					container.removeClass("active").css({
						left: -200,
						top: -200
					});
				});
		});

		if ( config.application.debug ) console.log("Widget :: Tooltips");
	}
}