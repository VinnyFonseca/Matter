$(document).ready(function() {
	// Nav

	$(".nav-trigger").on("click", function() {
		$("header").hasClass("active") ? $("header").addClass("active") : $("header").removeClass("active");
	});


	// Sidebar

	$(".sidebar").append("<ul></ul>");

	$(".main a.anchor").each(function(i) {
		var id = $(this).attr("id");
		var name = $(this).next().html();

		$(".sidebar ul").append('<li><a href="#' + id + '">' + name + '</a></li>');
		if ( i === 0 ) $(".sidebar ul a").addClass("active");
	});

	$(".sidebar-trigger").on("click", function() {
		!$(".main").hasClass("sidebar-on") ? $(".main").addClass("sidebar-on") : $(".main").removeClass("sidebar-on");
	});
	$("html, body").on("click", function(event) {
		if ( !$(event.target).closest(".sidebar") && $(".main").hasClass("sidebar-on") ) {
			$(".main").removeClass("sidebar-on");
		}
	});

	$(".sidebar li a").on("click", function(i) {
		$(".sidebar li a").removeClass("active");
		$(this).addClass("active");

		$(".main").removeClass("sidebar-on");
	});
});


// Sidebar anchors

$(window).on("scroll", function() {
	if ( !anchorClicked ) {
		$("a.anchor").each(function(i) {
			var top = $(this).offset().top - 200;

			if ( pageTop >= top ) {
				$(".sidebar li").find("a").removeClass("active");
				$(".sidebar li").eq(i - 1).find("a").addClass("active");
			}
			if ( pageTop < top ) {
				$(".sidebar li").eq(i + 1).find("a").removeClass("active");
			}
			if ( pageTop + $(window).height() >= $(document).height() ) {
				$(".sidebar li").find("a").removeClass("active");
				$(".sidebar li").eq($(".sidebar li").length - 1).find("a").addClass("active");
			}
		});
	}
});