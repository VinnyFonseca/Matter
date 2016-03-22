// Scroll Progress

matter.scroll = {
	init: function() {
		this.update();
		if ( matter.config.application.debug ) console.log("System :: Scroll");
	},
	update: function() {
		var scrollPercentage = (matter.viewport().top * 100) / (matter.doc().height - matter.viewport().height);
		$(".scroll-progress").width(scrollPercentage + "%");
	}
}