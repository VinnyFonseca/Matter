// Tooltips

matter.tooltip = {
	init: function() {
		if ( $("[data-tooltip]").length ) {
			$("[data-tooltip]").each(function() {
				var el = $(this),
					data = el.data("tooltip");

				if ( !matter.config.application.touch ) {
					el.on("mouseenter", function(event) {
						$("body").prepend('<div class="tooltip"></div>');
						$(".tooltip").html(data).addClass("active");

						$(this).on("mousemove", function(event) {
							matter.tooltip.position(event);
						});
					}).on("mouseleave", function() {
						$(".tooltip").remove();
					});
				} else {
					el.on("click", function(event) {
						$(".tooltip").remove();
						$("body").prepend('<div class="tooltip"></div>');

						matter.tooltip.position(event);
					});

					$("html, body").on("click", function(event) {
						if ( !$(event.target).closest("[data-tooltip]").length ) {
							$(".tooltip").remove();
						}
					});
				}
			});

			if ( matter.config.application.debug ) console.log("Widget :: Tooltips");
		}
	},
	bind: function() {
		var element = matter.dimensions(".tooltip");
		var target = matter.dimensions(matter.config.tooltip.bound.element);

		if ( matter.config.tooltip.bound.active ) {
			if ( element.left <= target.left ) {
				element.selector.css({ left: target.left });
			}
			if ( element.right >= target.right ) {
				element.selector.css({ left: target.right - element.width });
			}
		}
	},
	position: function(event) {
		var element = matter.dimensions(".tooltip");
		matter.tooltip.bind();

		var cursorX = event.pageX || event.originalEvent.touches[0].pageX,
		    cursorY = event.pageY || event.originalEvent.touches[0].pageY;

		switch(matter.config.tooltip.position) {
			case "left":
				element.selector.css({
					top: cursorY - element.height - 20,
					left: cursorX - element.width
				});
				break;

			case "center":
				element.selector.css({
					top: cursorY - element.height - 20,
					left: cursorX - (element.width / 2) - 5
				});
				break;

			case "right":
				element.selector.css({
					top: cursorY - element.height - 20,
					left: cursorX
				});
				break;

			default:
				element.selector.css({
					top: cursorY - element.height - 20,
					left: cursorX - (element.width / 2) - 5
				});
		}
	}
}