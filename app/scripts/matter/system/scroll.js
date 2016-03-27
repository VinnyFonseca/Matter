// Scroll Progress

matter.scroll = {
	init: function() {
		this.update();
		if ( config.application.debug ) console.log(":: Scroll");
	},
	update: function() {
		var scrollPercentage = (matter.viewport().top * 100) / (matter.doc().height - matter.viewport().height);
		$(".scroll-progress").width(scrollPercentage + "%");
	}
}