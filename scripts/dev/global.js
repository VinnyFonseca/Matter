$(document).ready(function() {

	// Nav

	$(".nav-trigger").on("click", function() {
		if ( $("header").hasClass("active") ) { $("header").addClass("active"); } else { $("header").removeClass("active"); }
	});


	// Progress Bar Demo

	var progress = 0;

	$("progress").each(function() {
		var el = $(this),
			label = el.prev("label"),
			bar = el.find(".progress-bar span");

		setInterval(function() {
			if ( progress < 100 ) {
				progress++;
			} else {
				progress = 0;
			}
			el.attr("value", progress);
			label.width(progress + "%").attr("data-progress", progress);
			bar.width(progress + "%").html(progress + "%");
		}, 500);
	});

});