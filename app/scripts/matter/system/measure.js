// Dimensions & Coordinates

matter.doc = function() {
	var object = {};

	object.selector = $(document);

	object.width = object.selector.width();
	object.height = object.selector.height();
	object.top = 0;
	object.bottom = object.top + object.height;
	object.left = 0;
	object.right = object.left + object.width;

	return object;
}

matter.viewport = function() {
	var object = {};

	object.type = function() {
		return window.getComputedStyle(document.querySelector("body"), ":before").getPropertyValue("content").replace(/\"/g, "");
	};

	object.selector = $(window);

	object.width = object.selector.width();
	object.height = object.selector.height();
	object.top = $(document).scrollTop();
	object.bottom = object.top + object.height;
	object.left = 0;
	object.right = object.left + object.width;

	return object;
}

matter.measure = function(element) {
	var object = {};

	object.selector = $(element);

	if ( object.selector.length ) {
		object.width = object.selector.outerWidth();
		object.height = object.selector.outerHeight();
		object.top = object.selector.offset().top;
		object.bottom = object.top + object.height;
		object.left = object.selector.offset().left;
		object.right = object.left + object.width;

		return object;
	} else {
		if ( matter.config.application.debug ) console.log(":: " + element + " does not exist (yet)");
	}
}