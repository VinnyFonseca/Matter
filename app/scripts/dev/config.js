var config = {
	application: {
		touch: Modernizr.touch && !device.desktop(), // bool: Modernizr check returns true or false.
		debug: true, // bool: use if (debug) console.log(); instead of console.log; for permanent debugging messages.
		root: typeof rootPath === "undefined" ? "" : rootPath // Path variable for javascript server side image loading.
	},
	typography: {
		resize: {
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
		delay: 5000, // int: miliseconds for disappearance.
		tone: "default" // str: "default", "success", "warning", "failure".
	},
	cookie: {
		active: true, // bool: on or off
		message: "We use cookies to give you a better experience. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.", // str: First visit cookie message.
		delay: 0 // int: First visit cookie delay on screen. 0 is permanent.
	},
	brochure: {
		active: true // bool: on or off
	},
	search: {
		view: "grid", // str: "grid", "list".
		display: "full", // str: "full", "mini".
		count: 10, // int: Number of items to show per page.
		pagination: true // bool: Toggle pagination controls and loading of page elements only.
	},
	slider: {
		nav: true, // bool: Show bullets.
		arrows: true, // bool: Show arrows.
		thumbnails: false, // bool: Show thumbnails.
		show: 1, // bool: Automatic slide change.
		slideshow: true, // bool: Automatic slide change.
		animation: "slide", // str: "slide", "fade".
		duration: 750, // int: miliseconds for slide change.
		interval: 7500, // int: miliseconds for slide interval.
		threshold: 20 // int: px distance on X axis from touchstart to current touch position.
	},
	tables: {
		responsive: true // bool: Converts every row into a separate table on mobiles.
	},
	tooltip: {
		bound: true, // bool: Sets boundaries to .wrapper (content container).
		position: "center" // str: "left", "center", "right".
	},
	twitter: {
		widgetId: '492660537293938688', // Generated via Twitter.com. See the matterframework.net/widgets..
		startAt: 0, // int: Starting tweet index.
		maxTweets: 3, // int: Maximum number of tweets shown at any time.
		enableLinks: true, // bool: Turns URLs and hashtags into links.
		showUser: true, // bool: Show User's avatar.
		showTime: true, // bool: Show posted time.
		showRetweet: false, // bool: Show retweets that you posted.
		showFollow: false, // bool: Show Follow button.
		showInteraction: false // bool: Show Reply, Retweet and Favorite.
	}
};