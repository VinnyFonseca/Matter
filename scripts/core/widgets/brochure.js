// Brochure System

var clearBrochure = function() {
	$(".brochure-counter").html(0);
	sessionSystem.remove("brochure");
}

var initBrochure = function() {
	if ( config.brochure.active ) {
		$(".brochure-trigger").show().on("click", function() {
			if (!$(".brochure-wrapper").hasClass("active")) {
				$(this).addClass("active");
				$(".brochure-wrapper").addClass("active");
			} else {
				$(this).removeClass("active");
				$(".brochure-wrapper").removeClass("active");
			}
		});
		$(document).on("click", function(event) {
			if (!$(event.target).closest(".brochure-trigger,.brochure-item, .brochure-wrapper.active").length) {
				$(".brochure-trigger, .brochure-wrapper").removeClass("active");
			}
		});


		var brochure = [],
			brochureCompare = [],
			brochureData = sessionSystem.get("brochure"),
			brochureDetails = {
				Name: document.title,
				URL: document.location.href
			};

		if ( typeof AddToBrochure === "undefined" ) var AddToBrochure = true;

		if ( brochureData === undefined ) {
			if ( AddToBrochure ) brochure.push(brochureDetails);
			sessionSystem.set("brochure", brochure);
		} else {
			for ( var i = 0; i < brochureData.length; i++ ) {
				brochure.push(brochureData[i]);
				brochureCompare.push(brochureData[i].URL == brochureDetails.URL);
			}

			if ( AddToBrochure && !brochureCompare.contains(true) ) brochure.push(brochureDetails);
			sessionSystem.set("brochure", brochure);
		}

		$(".brochure-counter").html(brochure.length);
		if ( brochure.length == 1 ) notify("Current page was added to your brochure.");

		for ( var j = 0; j < brochure.length; j++ ) {
			var brochureItem = '<div class="brochure-item" data-url="' + brochure[j].URL + '">\
									<span class="brochure-item-name">' + brochure[j].Name + '</span>\
									<img class="svg icon icon-close" src="' + config.application.root + 'img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-close.png\'" alt="Delete icon">\
								</div>';

			$(".brochure-item-wrapper").append(brochureItem);
		}

		$(".brochure-item").on("click", function() {
			var name = $(this).children("span").html();
			var url = $(this).data("url");

			$(this).remove();

			for ( var k = 0; k < brochure.length; k++ ) {
				if ( brochure[k].URL == url ) brochure.splice(k,1);
			}

			$(".brochure-counter").html(brochure.length);

			sessionSystem.set("brochure", brochure);
		});

		if ( config.application.debug ) console.log("System :: Brochure System");
	}
}