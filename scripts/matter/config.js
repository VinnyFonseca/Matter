var config = {
	application: {
		singlepage: false, // bool: Navigation behaviour for single page (anchor scrolling + active states based on scroll position).
		touch: Modernizr.touch, // bool: Modernizr check returns true or false. Beware of touch laptops.
		smoothscroll: {
			active: false, // bool: WARNING, EXPERIMENTAL, WINDOWS ONLY. Animates window scroll on mousewheel movement. Settings below.
			duration: 75, // int: miliseconds for scroll animation completion.
			step: $(window).height() / 6 // int: number of pixels on each mouse wheel turn.
		},
		debug: true // bool: use if (debug) console.log(); instead of console.log; for permanent debugging messages.
	},
	accessibility: {
		font: {
			range: 3 // int: number of increase and decrease steps for font size controls.
		}
	},
	forms: {
		validation: true // bool: Toggles client-side validation.
	},
	tables: {
		responsive: true // bool: Converts every row into a separate table on mobiles.
	},
	notification: {
		type: "float", // str: "float", "bar".
		delay: 5000, // int: miliseconds for disappearance.
		tone: "default" // str: "default", "success", "warning", "failure".
	},
	tooltip: {
		position: "center", // str: "left", "center", "right".
		bound: true // bool: Sets boundaries to .wrapper (content container).
	},
	slider: {
		duration: 500, // int: miliseconds for slide change.
		interval: 5000, // int: miliseconds for slide interval.
		threshold: 0, // int: px distance on X axis from touchstart to current touch position
		trigger: $(".wrapper").width() / 6 // int: px distance on drag to activate slide change
	},
	twitter: {
		id: '492660537293938688', // Generated via Twitter.com. See the matterframework.net/widgets..
		domId: 'widget-twitter', // str: Dom element's ID.
		maxTweets: 5, // int:  Maximum number of tweets shown at any time.
		enableLinks: true, // bool: Turns URLs and hashtags into links.
		showUser: true, // bool: Show User's avatar.
		showFollow: false, // bool: Show User's avatar.
		showTime: true, // bool: Show posted time.
		showRetweet: false, // bool: Show retweets that you posted.
		showInteraction: false // bool: Show Reply, Retweet and Favorite.
	}
};