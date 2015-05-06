// IE8 Fixes

if (!window.console) console = { log: function() {} };




// Asynchronous script loading with callback function

var loadScript = function(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;

	if ( callback ) script.onload = callback;
	document.body.appendChild(script);
}




// SVG Injection

var initSVGs = function() {
	if ( !$("html").hasClass("lt-ie9") && $('img.svg').length ) {
		var svgCount = 0;

		$('img.svg').each(function(i) {
			var img = $(this),
				imgID = img.attr('id'),
				imgClass = img.attr('class'),
				imgURL = img.attr('src');

			svgCount = i;

			$.get(imgURL, function(data) {
				var svg = $(data).find('svg');
				if(typeof imgID !== 'undefined') svg = svg.attr('id', imgID);
				if(typeof imgClass !== 'undefined') svg = svg.attr('class', imgClass + ' replaced-svg');
				svg.find("*").removeAttr("style");
				svg = svg.removeAttr('xmlns:a');
				img.replaceWith(svg);
			}, 'xml');
		});

		if ( config.application.debug ) console.log("System :: SVG Injection @ " + svgCount + " images");
	}
}




// Randomisation

var randomizeInteger = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}




// Popup

var popupWindow = function(url, title, w, h) {
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}




// Highlight

var highlight = function(el, val) {
	var match = RegExp(val, 'gi');

	el.each(function() {
		$(this).filter(function() {
			return match.test($(this).text());
		}).html(function() {
			if ( !val ) return $(this).text();
			return $(this).text().replace(match, '<span class="highlight">$&</span>');
		});
	});
}

var unhighlight = function(el) {
	el.find("span.highlight").replaceWith(function() {
		return $(this).text();
	});
}




// URLs

var URLQueryObject = function() { // Creates an object from a query string
	var urlParams = "";

	window.onpopstate = function() {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);

		urlParams = {};
		while (match == search.exec(query)) {
		   urlParams[decode(match[1])] = decode(match[2]);
		}
	};

	return urlParams;
}




// AJAX

var returnedData,
	dataObject = "";

var dataRequest = function(url, type, successFunction) {
	if ( config.application.debug ) console.log('AJAX ~~ Request');

	request = $.ajax({
		url: url,
		type: type,
		data: type == "POST" ? dataObject : "",
		dataType: "JSON",
		success: function(data) {
			if ( config.application.debug ) console.log('AJAX ~~ Success');
			// if ( config.application.debug ) console.log(data);
			if ( typeof successFunction !== 'undefined' ) successFunction(data);
		},
		error: function(request, status, error) {
			if ( config.application.debug ) console.log('AJAX ~~ Error');
			// if ( config.application.debug ) console.log(request, status, error, request.statusText);
		}
	});
}




// Hyperlinks

var anchorClicked;

var initLinks = function() {
	$(document).on("click", "a[href^='#']", function(event) {
		var link = $(this).attr("href");

		event.preventDefault();

		if ( link === "#") {
			if ( config.application.debug ) console.log("System :: Link blocked");
		} else {
			if ( $($.attr(this, "href")).length ) {
				anchorClicked = true;

				$("html, body").animate({
					scrollTop: $( $.attr(this, "href") ).offset().top - 90
				}, {
					duration: 1000,
					queue: false,
					complete: function() { anchorClicked = false; }
				});

				return false;
			}
		}
	});

	if ( config.application.debug ) console.log("System :: Links");
}




// Scroll Progress

var scrollProgress = function() {
	var scrollPercentage = (pageTop * 100) / ($(document).height() - $(window).height());
	$(".scroll-progress").width(scrollPercentage + "%");
}




// Initialisation

var initFramework = function() {
	isWideScreen = $(window).width() > 768;

	if ( config.application.touch ) { // If touch device
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-canvas").addClass("map-mobile"); // Fixes image distortion on Google Maps - See _base.scss.
	}


	// Logs Legend

	if ( config.application.debug ) {
		console.log(":: means DOM.ready");
		console.log("~~ means Async");
		console.log("•• means Complete");
		console.log("== means User Action");
		console.log(" ");
	}


	// Easter Eggs Init

	initKonami(buildKonami);


	// System Init

	initSVGs();
	initCookies();
	initLinks();
	initTables();
	scrollProgress();


	// Widgets Init

	initFontSizeControls();
	initOverlays();
	initNotifications();
	initTooltips();
	initSliders();
	initMap();
	initTwitter();
	initVideo();


	// Search Init

	initSearch();
	initAutocomplete();
	initTagClouds();


	// Forms Init

	initForm();
	initDropdowns();
	initValidation();


	var ms = new Date().getTime();
	if ( config.application.debug ) console.log("Done •• Matter in " + (new Date().getTime() - ms) + " milliseconds");
}




// Window Load

var isWideScreen;
var pageTop;
var pageBottom;

$(document).ready(initFramework);

$(window).on("load", function() {
	$("body").removeClass("preload"); // Fix for CSS3 animation on load.
});

$(window).on("resize", function() {
	isWideScreen = $(this).width() > 768;
});

$(window).on("scroll", function() {
	pageTop = $(document).scrollTop();
	pageBottom = pageTop + $(this).height();
	scrollProgress();
});