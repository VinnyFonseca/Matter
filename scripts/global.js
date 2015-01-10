var config = {
	application: {
		singlepage: false, // bool: Navigation behaviour for single page (anchor scrolling + active states based on scroll position)
		touch: Modernizr.touch, // bool: Modernizr check returns true or false. Beware of touch laptops.
		debug: true // bool: use if (debug) console.log(); instead of console.log; for permanent debugging messages.
	},
	tables: {
		responsive: true // bool: Converts every row into a separate table on mobiles
	},
	forms: {
		validation: true // bool: Toggles client-side validation
	},
	accessibility: {
		font: {
			range: 3 // int: number of increase and decrease steps for font size controls
		}
	},
	notification: {
		type: "float", // str: "float", "bar"
		delay: 5000, // int: miliseconds for disappearance
		tone: "default" // str: "default", "success", "warning", "failure"
	},
	tooltip: {
		position: "left", // str: "left", "center", "right"
		bound: true // bool: Sets boundaries to .wrapper (content container)
	},
	slider: {
		duration: 750,
		interval: 4000
	},
	twitter: {
		id: '492660537293938688', // Generated via Twitter.com. See the matterframework.net/widgets.
		domId: 'widget-twitter', // str: Dom element's ID
		maxTweets: 5, // int:  Maximum number of tweets shown at any time
		enableLinks: true, // bool: Turns URLs and hashtags into links
		showUser: true, // bool: Show User's avatar
		showFollow: false, // bool: Show User's avatar
		showTime: true, // bool: Show posted time
		showRetweet: false, // bool: Show retweets that you posted
		showInteraction: false // bool: Show Reply, Retweet and Favorite
	}
};



$(document).ready(function() {

	// Nav

	$(".nav-trigger").on("click", function() {
		if ( $("header").hasClass("active") ) { $("header").addClass("active"); } else { $("header").removeClass("active"); }
	});

});



// First Visit Cookie on page load

$(window).load(function() {
	var firstVisitCookie = cookieSystem.get("firstVisit");

	if ( firstVisitCookie === null ) {
		cookieSystem.set("firstVisit", "yes", 365);
		var cookieType = "bar",
			cookieDelay = 0,
			cookieTone = "warning",
			cookieMessage = "This is a sample text stating how Matter uses cookies to give you a better experience. View our <a href='#' target='_blank'>Privacy Policy</a> to read more about how we use them. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.";

		notify(cookieMessage, cookieTone, cookieType, cookieDelay);
	}
});