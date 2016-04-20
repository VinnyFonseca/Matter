var matter = matter || {};

matter.config = {
	application: {
		base: typeof basePath !== "undefined" ? basePath : "/", // str: path that should be appended to all img src attribute, ending in /
		touch: Modernizr.touch && !device.desktop(), // bool: Modernizr check returns true or false.
		debug: true // bool: use debug instead of console for all types of logging operations.
	},
	typography: {
		resize: {
			active: true, // bool: Toggles resizing control functionality
			range: 3 // int: number of increase and decrease steps for font size controls.
		},
		autoresize: {
			characters: 30, // Int: number of characters per line
			rows: 2, // Int: maximum number of rows
			minFontSize: 36, // Int: minimum font size allowed
			maxFontSize: 72 // Int: maximum font size allowed
		}
	},
	forms: {
		validation: true, // bool: Toggles client-side validation.
		multiUploadlimit: 3 // int: Multiple file upload limit.
	},
	notification: {
		active: true, // bool: on or off
		title: "System notification", // str: default title for notifications
		delay: 5000, // int: miliseconds for disappearance.
		tone: "default" // str: "default", "success", "warning", "failure".
	},
	cookie: {
		active: true, // bool: on or off
		message: "Our website uses cookies. They help us understand how customers use our website so we can give you the best experience possible and also keep our online adverts relevant. By continuing to browse this site or choosing to close this message, you give consent for cookies to be used.<br><a href='#' target='_blank'>Read more about our cookies.</a><br><button class='primary margin-top'>Don't show me this again</button>", // str: First visit cookie message.
		delay: 0 // int: First visit cookie delay on screen. 0 is permanent.
	},
	brochure: {
		active: true // bool: on or off
	},
	search: {
		view: "grid", // str: "grid", "list".
		mode: "full", // str: "full", "mini".
		display: 9, // int: Number of items to show per page.
		pagination: false // bool: Toggle pagination controls and loading of page elements only.
	},
	slider: {
		nav: true, // bool: Show bullets.
		arrows: true, // bool: Show arrows.
		thumbnails: false, // bool: Show thumbnails.
		slideshow: true, // bool: Automatic slide change.
		duration: 750, // int: miliseconds for slide change.
		interval: 7500, // int: miliseconds for slide interval.
		threshold: 20 // int: px distance on X axis from touchstart to current touch position.
	},
	tables: {
		responsive: true // bool: Converts every row into a separate table on mobiles.
	},
	tooltip: {
		bound: {
			element: ".wrapper", // str: Element selector you wish to bind the tooltip.
			active: true // bool: Sets boundaries to element (content container).
		},
		position: "center" // str: "left", "center", "right".
	}
};