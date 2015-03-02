// IE8 Fixes

if (!window.console) console = { log: function() {} };

window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;

if ( !Array.prototype.indexOf ) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n != 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	}
}




// ECMAScript5 Polyfills

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}




// Asynchronous script loading with callback function

function loadScript(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;

	if ( callback ) script.onload = callback;
	document.body.appendChild(script);
}




// Randomisation

function randomizeInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}




// Easter Eggs

function alertKonami() {
	alert("TETSUOOO!!");
}

function initKonami(callback) {
	var userCode = [],
		userString = "",
		konamiCoding = false;

	function resetKonami() {
		userCode = [];
		userString = "";
		konamiCoding = false;
	}

	function konami(event) {
		var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
		var konamiString = konamiCode.join(", ");

		if ( event.keyCode == 38 ) konamiCoding = true;

		if ( konamiCoding && userString.length <= konamiString.length ) {
			if ( userString.indexOf(konamiString) == -1 ) {
				userCode.push(event.keyCode);
				userString = userCode.join(", ");
			}
			if ( userString.indexOf(konamiString) != -1 ) {
				console.log("Easter Egg :: Konami!");
				resetKonami();

				callback();

				if ( event.keyCode == 27 ) {
					resetKonami();
				}
			}
		} else {
			resetKonami();
		}
	}

	$(document).on("keyup", konami);
}




// SVG Injection

function initSVGs() {
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
				svg = svg.removeAttr('xmlns:a');
				img.replaceWith(svg);
			}, 'xml');
		});

		if ( config.application.debug ) console.log("System :: SVG Injection @ " + svgCount + " images");
	}
}




// URL

function URLQueryObject() { // Creates an object from a query string
	var urlParams = "";

	(window.onpopstate = function () {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);

		urlParams = {};
		while (match = search.exec(query)) {
		   urlParams[decode(match[1])] = decode(match[2]);
		}
	})();

	return urlParams;
}




// AJAX System

var returnedData,
	dataObject;

function dataRequest(url, type, successFunction) {
	if ( config.application.debug ) console.log('AJAX ~~ Request');

	request = $.ajax({
		url: url,
		type: type,
		data: type == "POST" ? data : "",
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




// Tables

function initTables() {
	if ( config.tables.responsive && $("table").length ) {
		$("table").each(function() {
			var el = $(this),
				id = this.id,
				table = document.getElementById(id),
				data = [],
				headers = [];

			el.addClass("table-original");

			for ( var i = 0; i < table.rows[0].cells.length; i++ ) {
				headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
			}

			for ( var j = 1; j < table.rows.length; j++ ) {
				var tableRow = table.rows[j]; var rowData = {};

				for ( var k = 0; k < tableRow.cells.length; k++ ) {
					rowData[headers[k]] = tableRow.cells[k].innerHTML;
				}

				data.push(rowData);
			}

			for ( var l = 0; l < data.length; l++ ) {
				var rowGroup = data[l];
				var mobileTableRaw = '<table class="' + id + '-row-' + l + ' table-mirror">\
										  <tbody>\
										  </tbody>\
									  </table>';

				$(mobileTableRaw).insertAfter(el);

				var mobileTable = $('.' + id + '-row-' + l);
				if ( el.children("caption").length ) mobileTable.prepend("<caption>Row of " + el.children("caption").html() + "</caption>");

				Object.keys(rowGroup).forEach(function(key) {
					var row = '<tr>\
								   <th scope="row">' + key + '</th>\
								   <td>' + rowGroup[key] + '</td>\
							   </tr>';

					mobileTable.children("tbody").append(row);
				});
			}
		});

		if ( config.application.debug ) console.log("System :: Tables");
	}
}




// Init Hyperlinks

var anchorClicked;

function initLinks() {
	// Smooth same page navigation for <a href="#target-anchor" class="anchor"></a> elements.

	$(document).on("click", "a[href^='#']", function(event) {
		var link = $(this).attr("href");

		event.preventDefault();

		if ( link === "#") {  // Blocks click event on empty (#) links and logs a message.
			if ( config.application.debug ) console.log("Intentional: blocked behaviour on global.js.");
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




// Detect Scroll Progress

function scrollProgress() {
	var scrollPercentage = (pageTop * 100) / ($(document).height() - $(window).height());
	$(".scroll-progress").width(scrollPercentage + "%");
}




// Initialisation

function initFramework() {
	isWideScreen = $(window).width() > 768;

	if ( config.application.touch ) { // If touch device
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-wrapper").addClass("map-mobile"); // Fixes image distortion on Google Maps - See _base.scss.
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

	initKonami(alertKonami);

	// System Init

	initSVGs();
	initCookies();
	initLinks();
	initNav();
	initTables();
	scrollProgress();

	// Widgets Init

	initOverlays();
	initNotifications();
	initTooltips();
	initSliders();
	initMap();
	initTwitter();
	initFontSizeControls();

	// Search Init

	initSearch();
	initAutocomplete();
	initTagClouds();

	// Forms Init

	initDropdowns();
	loadFileInputs(config.forms.uploadlimit);
	initValidation();
	loadProgressBar();

	if ( config.application.debug ) console.log("Done •• Matter");
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
	isWideScreen = $(window).width() > 768;
});

$(window).on("scroll", function() {
	pageTop = $(document).scrollTop();
	pageBottom = pageTop + $(window).height();
	scrollProgress();
});