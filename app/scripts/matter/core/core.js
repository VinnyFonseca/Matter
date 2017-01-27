// Core

var ms = new Date().getTime();
var viewport;

matter.init = function() {
	viewport = matter.viewport().type(); // Detect and set viewport type

	if ( matter.config.application.touch ) FastClick.attach(document.body);

	// Logs Legend

  debug.log("LEGEND");
  debug.log("------");
	debug.log(":: Module");
	debug.log("~~ Async");
	debug.log("== User Action");
	debug.log("## API Request");
	debug.log("•• Complete");
	debug.log(" ");
	debug.log("APP");
	debug.log("------");


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
	matter.notification.init();
	matter.tooltip.init();

	// Search Init

	initSearch();
	initAutocomplete();
	matter.tagcloud.init();

	// Forms Init

	matter.validation.init();
  matter.form.init();
}


// Deferred Initialisation

matter.defer = function() {
	$("body").removeClass("preload");

	// Deferred Init

  matter.grid.init();
  matter.debug.init();
	matter.sliders.init();
	matter.map.init();
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