// Console fix IE8

if (!window.console) console = { log: function() {} };




// Easter Eggs

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

		videoPlayer = $("#custom-video").find("video");

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




// ECMAScript5 Fixes

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		"use strict";
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	};
}


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




// SVG Injection

function initSVGs() {
	if ( !$("html").hasClass("lt-ie9") ) {
		$('img.svg').each(function(i) {
			var img = $(this),
				imgID = img.attr('id'),
				imgClass = img.attr('class'),
				imgURL = img.attr('src');

			$.get(imgURL, function(data) {
				var svg = $(data).find('svg');
				if(typeof imgID !== 'undefined') svg = svg.attr('id', imgID);
				if(typeof imgClass !== 'undefined') svg = svg.attr('class', imgClass + ' replaced-svg');
				svg = svg.removeAttr('xmlns:a');
				img.replaceWith(svg);
			}, 'xml');
		});

		if (config.application.debug) console.log("Init :: SVG Injection");
	}
}




// Randomisation

function randomizeInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
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
	if (config.application.debug) console.log('AJAX :: Request');

	request = $.ajax({
		url: url,
		type: type,
		data: type == "POST" ? data : "",
		dataType: "JSON",
		success: function(data) {
			if (config.application.debug) console.log('AJAX :: Success');
			// if (config.application.debug) console.log(data);
			if ( typeof successFunction !== 'undefined' ) successFunction(data);
		},
		error: function(request, status, error) {
			if (config.application.debug) console.log('AJAX :: Error');
			if (config.application.debug) console.log(request, status, error, request.statusText);
		}
	});
}


// Asynchronous script loading with callback function

function loadScript(src, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;

	if ( callback ) script.onload = callback;
	document.body.appendChild(script);
}




// Tables

function initTables() {
	if ( config.tables.responsive ) {
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
	}

	if (config.application.debug) console.log("Init :: Tables");
}




// Init Hyperlinks

function initLinks() {
	$("a[href^='#']").on("click", function(event) { // Smooth same page navigation for <a href="#target-anchor" class="anchor"></a> elements.
		var link = $(this).attr("href");

		event.preventDefault();

		if ( link === "#") {  // Blocks click event on empty (#) links and logs a message.
			if (config.application.debug) console.log("Intentional: blocked behaviour on global.js.");
		} else {
			if ( $($.attr(this, "href")).length ) {
				$("html, body").animate({
					scrollTop: $( $.attr(this, "href") ).offset().top - 73
				}, 1000);

				return false;
			}
		}
	});

	$("a.explicit").each(function() {
		$(this).append(" <small>[" + this.href + "]</small>");
	});

	if ( config.application.debug ) console.log("Init :: Links");
}




// Detect Scroll Progress

function scrollProgress() {
	var scrollPercentage = ($("html body").scrollTop() * 100) / ($(document).height() - $(window).height());
	$(".scroll-progress").width(scrollPercentage + "%");
}




// Initialisation

function initFramework() {
	isWideScreen = $(window).width() > 768;

	if ( Modernizr.touch ) { // If touch device
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-wrapper").addClass("map-mobile"); // Fixes image distortion on Google Maps - See _base.scss.
	}



	// System Init

	initSVGs();
	initCookies();
	initLinks();
	initNav();
	initTables();
	scrollProgress();

	// Widgets Init

	initFontSizeControls();
	initNotifications();
	initTagClouds();
	initOverlays();
	initTooltips();
	initSliders();
	initTwitter();
	initMap();

	// Forms Init

	initDropdowns();
	loadFileInputs(3, "file");
	initValidation();

	if (config.application.debug) console.log("Done •• Matter");
}




// Window Load

var isWideScreen;

$(document).ready(initFramework);

$(window).on("load", function() {
	$("body").removeClass("preload"); // Fix for CSS3 animation on load.
});

$(window).on("resize", function() {
	isWideScreen = $(window).width() > 768;
});

$(window).on("scroll", function() {
	scrollProgress();
});