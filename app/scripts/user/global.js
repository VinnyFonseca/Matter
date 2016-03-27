$(document).ready(function() {
	// First Visit Cookie

	if ( matter.cookie.get("firstVisit") === null ) {
		cookieNotify = true;
		matter.cookie.set("firstVisit", "yes", 365);
		notify("Cookie Disclaimer", matter.config.cookie.message, 0);
	}



	// Nav

	$(".nav-trigger").on("click", function() {
		$("header").toggleClass("active");
	});
	$(".nav-item").on("click", function() {
		$("header").removeClass("active");
	});
	$("html, body").on("click", function(event) {
		if ( !$(event.target).closest("header").length ) $("header").removeClass("active");
	});



	// Sharing

	$(".share-twitter").on('click', function(event) {
		var shareURL = "http://www.twitter.com/intent/tweet?"
			text     = "text=Test tweet here",
			hashtags = "&hashtags=Test",
			mentions = "&via=VirginMoney",
			finalURL = shareURL + text + hashtags + mentions;

	    matter.popup(finalURL, "Virgin Money - One in a million", 640, 320);
	});

	$(".share-facebook").on('click', function(event) {
	    var shareURL = "http://www.facebook.com/sharer/sharer.php?"
	        finalURL = shareURL + "u=" + location.href;

	    matter.popup(finalURL, "Virgin Money - One in a million", 640, 320);
	});

	$(".share-linkedin").on('click', function(event) {
	    var shareURL = "http://www.linkedin.com/shareArticle?mini=true&"
	        title    = "title=Test tweet here",
	        summary  = "summary=Test tweet here",
	        finalURL = shareURL + "url=" + location.href + "&" + title + "&" + summary;

	    matter.popup(finalURL, "Virgin Money - One in a million", 640, 480);
	});
});



// Window Events

var controls = matter.measure(".controls");

var controlsPosition = function() {
	if ( matter.viewport().top > controls.top ) {
		$(".controls").addClass("scrolling");
	} else {
		$(".controls").removeClass("scrolling");
	}
}

$(window).on("scroll", function() {
	controlsPosition();
});