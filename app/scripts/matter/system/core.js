// Animation Frame

var initAnimationFrame = function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms', 'o'];
	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; x++ ) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if ( !window.requestAnimationFrame ) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if ( !window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}




// SVG Injection

var initSVGs = function() {
	if ( $("img[src$='.svg']").length ) {
		var svgCount = 0;

		$("img[src$='.svg']").each(function(i) {
			var img = $(this),
				imgID = img.attr('id'),
				imgClass = img.attr('class'),
				imgURL = img.attr('src');

			svgCount = i;

			if ( !Modernizr.svg ) {
				imgURL = imgURL.replace(".svg", ".png");
				img.attr("src", imgURL);
			} else {
				$.get(imgURL, function(data) {
					var svg = $(data).find("svg");
					if(typeof imgID !== "undefined") svg = svg.attr("id", imgID);
					if(typeof imgClass !== "undefined") svg = svg.attr("class", imgClass + " replaced-svg");
					if ( img.hasClass("icon") ) svg.find("*").removeAttr("style");
					svg = svg.removeAttr("xmlns:a");
					img.after(svg).remove();
				}, "xml").fail(function() {
	                img.removeClass("svg");
	            });
			}
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




// Text resizing

var resizeText = function(elem) {
	var el = $(elem);
	var span = el.children("span");
	var charLimit = config.typography.autoresize.characters;
	var rowLimit = config.typography.autoresize.rows;
	var minFontSize = config.typography.autoresize.minFontSize;
	var maxFontSize = config.typography.autoresize.maxFontSize;
	var fontSize = minFontSize;

	var stringRebuild = (function() {
		if ( !el.hasClass("rebuilt") ) {
			var string = el.html();

			if ( !el.children("span").length ) el.empty().append("<span>" + string + "</span>");

			span = el.children("span");
			var stringContent = span.text().trim();
			var stringLength = stringContent.length;
			var stringFinal = "";
			var stringHalf = Math.round(stringLength / 2);
			var spaceFound = false;

			if ( stringLength > charLimit && rowLimit > 1 ) {
				for ( var i = 0; i < stringLength; i++ ) {
					if ( !spaceFound && i > stringHalf && /\s/.test(stringContent[i]) ) {
						stringFinal += "<br />";
						spaceFound = true;
					} else {
						stringFinal += stringContent[i];
					}
				}

				span.html(stringFinal);
			}

			el.addClass("rebuilt");
		}
	})();

	var stringResize = (function() {
		do {
			fontSize--;
			span.css({
				'font-size': fontSize.toString() + 'px',
				'font-size': (fontSize / 10).toString() + 'rem'
			});
		} while (span.width() > el.width() && fontSize > minFontSize);

		do {
			fontSize++;
			span.css({
				'font-size': fontSize.toString() + 'px',
				'font-size': (fontSize / 10).toString() + 'rem'
			});
		} while (span.width() < el.width() && fontSize < maxFontSize);

		if ( !el.hasClass("resized") ) el.addClass("resized");
	})();
}




// URLs

var getQueryParameters = function(str) {
	return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
		return n = n.split("="), this[n[0]] = n[1], this;
	}.bind({}))[0];
}

var URLQueryObject = function() { // Creates an object from the URL's query string
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

var requestData = function(url, type, successFunction) {
	if ( config.application.debug ) console.log('AJAX ~~ Request (' + url + ')');

	request = $.ajax({
		url: url,
		type: type,
		data: type == "POST" ? dataObject : "",
		dataType: "JSON",
		success: function(data) {
			if ( config.application.debug ) console.log('AJAX ~~ Success (' + url + ')');
			// if ( config.application.debug ) console.log(data);
			if ( typeof successFunction !== 'undefined' ) successFunction(data);
		},
		error: function(request, status, error) {
			if ( config.application.debug ) console.log('AJAX ~~ Error (' + url + ')');
			// if ( config.application.debug ) console.log(request, status, error, request.statusText);
		}
	});
}




// Asynchronous script loading with callback function

var loadScript = function(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;

	if ( callback ) script.onload = callback;
	document.body.appendChild(script);
}




// Hyperlinks

var anchorClicked;

var initLinks = function() {
	$(document).on("click", "a[href^='#']", function(event) {
		var link = $.attr(this, "href");

		event.preventDefault();

		if ( link === "#") {
			if ( config.application.debug ) console.log("System :: Link blocked");
		} else {
			if ( $(link).length ) {
				anchorClicked = true;

				$("html, body").animate({
					scrollTop: $(link).offset().top - 40
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

var ms = new Date().getTime();

var matterReady = function() {
	isWideScreen = $(window).width() > 768;

	if ( config.application.touch ) { // If touch device
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-canvas").addClass("map-mobile"); // Fixes image distortion on Google Maps - See styles/core/widgets/_map.scss.
	}


	// Logs Legend

	if ( config.application.debug ) {
		console.log(":: is DOM.ready");
		console.log("~~ is Async");
		console.log("•• is Complete");
		console.log("== is User Action");
		console.log(" ");
	}


	// Easter Eggs Init

	initKonami();


	// System Init

	initAnimationFrame();
	initSVGs();
	initSession();
	initCookies();
	initLinks();
	initTables();
	scrollProgress();


	// Widgets Init

	initOverlays();
	initNotifications();
	initTooltips();


	// Search Init

	initSearch();
	initAutocomplete();
	initTagClouds();


	// Forms Init

	initForm();
	initDropdowns();
	initValidation();


	// Global Init

	initGlobal();
}


var matterDeferred = function() {
	$("body").removeClass("preload");

	// Deferred Init

	initSliders();
	initMap();
	initVideo();

	if ( config.application.debug ) console.log("Done •• Matter in " + (new Date().getTime() - ms) + " milliseconds");
}




// Window Load

var isWideScreen;
var pageTop;
var pageBottom;

$(document).on("ready", matterReady);

$(window).on("load", matterDeferred);

$(window).on("resize", function() {
	isWideScreen = $(this).width() > 768;
});

$(window).on("scroll", function() {
	pageTop = $(document).scrollTop();
	pageBottom = pageTop + $(this).height();
	scrollProgress();
});
