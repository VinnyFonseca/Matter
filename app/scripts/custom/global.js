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

	if ( $(".main a.anchor").length > 1 ) {
		$(".sidebar").append("<nav></nav>").show();

		var container;

		$(".main a.anchor").each(function(i) {
			var el = $(this);
			var id = el.attr("id");
			var target = el.next();
			var name = target.html();
			var type = target.prop('nodeName') == "H2" ? "core" : "sub";

			if ( type == "core" ) {
				container = id;
				$(".sidebar nav").append('<div class="container" data-type="' + container + '"></div>');
			}

			$(".sidebar .container[data-type=" + container + "]").append('<a href="#' + id + '" class="' + type + '" data-container="' + container + '">' + name + '</a>');
		});
	}

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

	$(".sidebar a").on("click", function(i) {
		if ( $(this).hasClass("core") ) {
			var container = $(this).data("container");
			$(".sidebar .container").removeClass("selected");
			$(".sidebar .container[data-type=" + container + "]").addClass("selected");
		}

		$(".sidebar a").removeClass("active");
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

function detectSidebar() {
	if ( !anchorClicked && $("a.anchor").length ) {
		$("a.anchor").each(function(i) {
			var top = $(this).offset().top - 40;
			var length = $(".sidebar a").length;

			if ( pageTop >= top ) {
				$(".sidebar a").removeClass("active")
				$(".sidebar a").eq(i).addClass("active");

				if ( $(".sidebar a").eq(i).hasClass("core") ) {
					$(".sidebar a").eq(i).addClass("active");

					var container = $(".sidebar a").eq(i).data("container");
					$(".sidebar .container").removeClass("selected");
					$(".sidebar .container[data-type=" + container + "]").addClass("selected");
				}
			}
			if ( pageTop + $(window).height() >= $(document).height() ) {
				$(".sidebar a").removeClass("active").eq(length - 1).addClass("active");
			}
		});
	}
}

$(window).on("scroll", function() {
	requestAnimationFrame(introParallax);
	detectSidebar();
});
