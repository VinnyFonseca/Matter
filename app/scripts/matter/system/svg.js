// SVG Injection

matter.svg = {
	init: function() {
		if ( $("img[src$='.svg']").length ) {
			var svgCount = 0;

			$.each($("img[src$='.svg']"), function(i) {
				var img = $(this),
					imgID = img.attr('id'),
					imgClass = img.attr('class'),
					imgURL = img.attr('src');

				svgCount = i;

				if ( !Modernizr.svg ) {
					imgURL = imgURL.replace(".svg", ".png");
					img.attr("src", imgURL);
				} else {
					$.get(imgURL, function(data) {
						var svg = $(data).find("svg");
						if(typeof imgID !== "undefined") svg = svg.attr("id", imgID);
						if(typeof imgClass !== "undefined") svg = svg.attr("class", imgClass + " replaced-svg");
						if ( img.hasClass("icon") ) svg.find("*").removeAttr("style");
						svg = svg.removeAttr("xmlns:a");
						img.after(svg).remove();
					}, "xml").fail(function() {
		                img.removeClass("svg");
		            });
				}
			});

			if ( matter.config.application.debug ) console.log(":: SVG Injection @ " + svgCount + " images");
		}
	}
}