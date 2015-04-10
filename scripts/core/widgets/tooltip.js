// Tooltips

var initTooltips = function() {
	if ( $("[data-tooltip]").length ) {
		var tooltipPosition = function(evt, content) {
			var container = $(".tooltip"),
				cursorX = evt.pageX || evt.originalEvent.touches[0].pageX,
				cursorY = evt.pageY || evt.originalEvent.touches[0].pageY;

			container.html(content).addClass("active");

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
		}

		$("[data-tooltip]").each(function() {
			var el = $(this),
				tooltipData = el.data("tooltip");

			if ( !config.application.touch ) {
				el.on("mouseenter", function(event) {
					$("body").prepend('<div class="tooltip"></div>');

					$(this).on("mousemove", function(event) {
						tooltipPosition(event, tooltipData);
					});
				}).on("mouseleave", function() {
					$(".tooltip").remove();
				});
			} else {
				el.on("click", function(event) {
					$(".tooltip").remove();

					$("body").prepend('<div class="tooltip"></div>');

					tooltipPosition(event, tooltipData);
				});

				$("html, body").on("click", function(event) {
					if ( !$(event.target).closest("[data-tooltip]").length ) {
						$(".tooltip").remove();
					}
				});

			}
		});

		if ( config.application.debug ) console.log("Widget :: Tooltips");
	}
}