$(document).ready(function() {
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

	var progressTrigger = function(element, percentage) {
		if ( percentage <= 0 ) percentage = 0;
		if ( percentage >= 100 ) percentage = 100;

		var el = $(element);
		if ( !el.children("div").length ) el.append("<div></div>");

		var counter = el.children("div");
		counter.removeClass("active").width(percentage + "%").attr("data-percentage", percentage);

		if ( percentage >= 7 ) counter.addClass("active");

		if ( matter.config.application.debug ) console.log("Progress :: " + percentage + "%");
	}

	$("[data-progress]").on("click", function(event) {
		var progress = 0;
		clearInterval(progressInterval);

		var progressInterval = setInterval(function() {
			if ( progress < 100 ) {
				progress++;
				progressTrigger(".progress-bar", progress);
			} else {
				clearInterval(progressInterval);
			}
		}, 300);
	});
});



// Window Events

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

$(window).on("scroll", function() {
	sidebarUpdate();
});