var initGlobal = function() {

	// First Visit Cookie

	var firstVisitCookie = cookieSystem.get("firstVisit");

	if ( firstVisitCookie === null ) {
		cookieNotify = true;
		cookieSystem.set("firstVisit", "yes", 365);
		notify(config.cookie.message, config.cookie.delay);
	}



	// Nav

	var page,
		url = this.location.href,
		section = url.split("/"),
		nav = $("nav"),
		scrolling = false;

	for ( var i = 0; i < section.length; i++ ) page = section[section.length - 1].split(".")[0];

	nav.children("a").removeClass("active");
	var navActive = page.length ? nav.children("a[href*=" + page + "]").addClass("active") : nav.children("a").eq(0).addClass("active");

	$(".nav-trigger").on("click", function() {
		$("header").toggleClass("active");
	});
	$(".nav-close").on("click", function() {
		$("header").removeClass("active");
	});
	$("html, body").on("click", function(event) {
		if ( !$(event.target).closest("header").length ) $("header").removeClass("active");
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
		if ( !$(".main").hasClass("sidebar-on") ) {
			$(".main").addClass("sidebar-on");
		} else {
			$(".main").removeClass("sidebar-on");
		}
	});
	$("html, body").on("click", function(event) {
		if ( !$(event.target).closest(".sidebar").length && $(".main").hasClass("sidebar-on") ) {
			$(".main").removeClass("sidebar-on");
		}
	});

	$(".sidebar li a").on("click", function(i) {
		$(".sidebar li a").removeClass("active");
		$(this).addClass("active");

		$(".main").removeClass("sidebar-on");
	});
}



// Window Events

var introParallax = function() {
	$(".intro .parallax").css({
		"-webkit-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
		"-moz-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
		"-ms-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
		"-o-transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
		"transform": "translate3d(0, " + pageTop / 2 + "px, 0)",
		"opacity": 1 - (pageTop / 500)
	});
}

var stickyControls = function() {
	var controlsBottom = $(".controls").offset().top + $(".controls").outerHeight();

	if ( controlsBottom >= $("footer").offset().top ) {
		$(".controls").css({
			"position": "absolute",
			"top": $("footer").offset().top - $(".controls").outerHeight(),
			"bottom": "auto"
		});
	}

	if ( $(document).scrollTop() + $(window).height() < controlsBottom ) {
		$(".controls").css({
			"position": "fixed",
			"top": "auto",
			"bottom": 0
		});
	}
}

$(window).on("scroll", function() {
	stickyControls();
	requestAnimationFrame(introParallax);

	if ( !anchorClicked && $("a.anchor").length ) {
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
})
.on("load", stickyControls)
.on("resize", stickyControls);