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