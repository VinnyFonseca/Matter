$(document).ready(function() {

	// Nav

	$(".nav-trigger").on("click", function() {
		if ( $("header").hasClass("active") ) { $("header").addClass("active"); } else { $("header").removeClass("active"); }
	});

});