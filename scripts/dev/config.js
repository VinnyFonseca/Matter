var config = {
	application: {
		touch: Modernizr.touch && !device.desktop(), // bool: Modernizr check returns true or false.
		debug: true, // bool: use if (debug) console.log(); instead of console.log; for permanent debugging messages.
		root: typeof rootPath === "undefined" ? "" : rootPath // Path variable for javascript server side image loading.
	},
	accessibility: {
		font: {
			range: 3 // int: number of increase and decrease steps for font size controls.
		}
	},
	typography: {
		autoresize: {
			characters: 30,
			rows: 2,
			minFontSize: 36,
			maxFontSize: 72
		}
	},
	cookie: {
		firstVisit: {
			message: "Matter uses cookies to give you a better experience. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.", // str: First visit cookie message.
			delay: 0, // int: First visit cookie delay on screen. 0 is permanent.
			tone: "warning" // str: "default", "success", "warning", "failure".
		}
	},
	forms: {
		validation: true, // bool: Toggles client-side validation.
		uploadlimit: 3 // int: Multiple file upload limit.
	},
	notification: {
		tone: "default", // str: "default", "success", "warning", "failure".
		delay: 5000, // int: miliseconds for disappearance.
	},
	search: {
		view: "grid", // str: "grid", "list".
		display: "full", // str: "full", "mini".
		count: 10, // int: Number of items to show per page.
		pagination: false // bool: Toggle pagination controls and loading of page elements only.
	},
	slider: {
		arrows: true, // bool: Show arrows.
		bullets: true, // bool: Show bullets.
		slideshow: true, // bool: Automatic slide change.
		duration: 500, // int: miliseconds for slide change.
		interval: 5000, // int: miliseconds for slide interval.
		threshold: 10, // int: px distance on X axis from touchstart to current touch position.
		animation: "slide" // str: "slide", "fade".
	},
	tables: {
		responsive: true // bool: Converts every row into a separate table on mobiles.
	},
	tooltip: {
		position: "center", // str: "left", "center", "right".
		bound: true // bool: Sets boundaries to .wrapper (content container).
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