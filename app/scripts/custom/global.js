$(document).ready(function() {
	// First Visit Cookie

	if ( matter.cookie.get("firstVisit") === null ) {
		cookieNotify = true;
		matter.cookie.set("firstVisit", "yes", 365);
		notify("Cookie Disclaimer", matter.config.cookie.message, 0);
	}



	// Nav

	var page,
		url = location.href.split('?')[0],
		section = url.split("/"),
		nav = $("nav"),
		scrolling = false;

	nav.children("a").removeClass("active");

	for ( var i = 0; i < section.length; i++ ) page = section[section.length - 1].split(".")[0];
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
		if ( !$("body").hasClass("sidebar-on") ) {
			$("body").addClass("sidebar-on");
		} else {
			$("body").removeClass("sidebar-on");
		}
	});
	$(".main").on("click", function(event) {
		if ( !$(event.target).closest(".sidebar").length && $("body").hasClass("sidebar-on") ) {
			$("body").removeClass("sidebar-on");
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

		if ( $(this).hasClass("sub") ) $("body").removeClass("sidebar-on");
	});




	// Progress Bars Test

	$("[data-progress]").on("click", function(event) {
		var progress = 0;
		clearInterval(progressInterval);

		var progressInterval = setInterval(function() {
			if ( progress < 100 ) {
				progress++;
				matter.progress.trigger(".progress-bar", progress);
			} else {
				clearInterval(progressInterval);
			}
		}, 300);
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

var introParallax = function() {
	$(".intro .parallax").css({
		"-webkit-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-moz-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-ms-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-o-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"opacity": 1 - (matter.doc().top / 500)
	});
}

var sidebarUpdate = function() {
	if ( !matter.anchor.clicked && $("a.anchor").length ) {
		$("a.anchor").each(function(i) {
			if ( matter.viewport().top >= $(this).offset().top - 40 ) {
				$(".sidebar a").removeClass("active")
				$(".sidebar a").eq(i).addClass("active");

				if ( $(".sidebar a").eq(i).hasClass("core") ) {
					$(".sidebar a").eq(i).addClass("active");

					var container = $(".sidebar a").eq(i).data("container");
					$(".sidebar .container").removeClass("selected");
					$(".sidebar .container[data-type=" + container + "]").addClass("selected");
				}
			}
			if ( matter.viewport().top + matter.viewport().height >= matter.doc().height ) {
				$(".sidebar a").removeClass("active").eq($(".sidebar a").length - 1).addClass("active");
			}
		});
	}
}

var controls = matter.dimensions(".controls");

var controlsPosition = function() {
	if ( matter.viewport().top > controls.top ) {
		$(".controls").addClass("scrolling");
	} else {
		$(".controls").removeClass("scrolling");
	}
}

$(window).on("scroll", function() {
	requestAnimationFrame(introParallax);
	sidebarUpdate();
	controlsPosition();
});