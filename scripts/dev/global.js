$(document).ready(function() {
	// Nav

	$(".nav-trigger").on("click", function() {
		$("header").hasClass("active") ? $("header").addClass("active") : $("header").removeClass("active");
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