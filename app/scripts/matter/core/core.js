// Core

var ms = new Date().getTime();
var viewport;

matter.init = function() {
	viewport = matter.viewport().type(); // Detect viewport type

	if ( matter.config.application.touch ) {
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-canvas").addClass("map-mobile"); // Fixes image distortion on Google Maps - See styles/core/widgets/_map.scss.
	}

	// Logs Legend

	debug.log(":: is DOM.ready");
	debug.log("~~ is Async");
	debug.log("•• is Complete");
	debug.log("== is User Action");
	debug.log("## is API");
	debug.log(" ");


	// Easter Eggs Init

	matter.konami.init();

	// System Init

	matter.local.init();
	matter.cookie.init();
	matter.session.init();
	matter.svg.init();
	matter.anchor.init();
	matter.table.init();
	matter.scroll.init();

	// Widgets Init

	matter.overlay.init();
	initNotifications();
	matter.tooltip.init();

	// Search Init

	initSearch();
	initAutocomplete();
	matter.tagcloud.init();

	// Forms Init

	initValidation();
	initForm();
	initDropdowns();
}


// Deferred Initialisation

matter.defer = function() {
	$("body").removeClass("preload");

	// Deferred Init

	matter.sliders.init();
	initMap();
	initVideo();

	debug.log("•• Matter in " + (new Date().getTime() - ms) + " milliseconds");
}


// DOM Events

$(document).on("ready", matter.init());

$(window)
	.on("load", matter.defer())
	.on("resize", function() {
		viewport = matter.viewport().type();
	})
	.on("scroll", matter.scroll.update);
