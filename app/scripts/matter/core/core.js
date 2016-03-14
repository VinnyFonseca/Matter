// Dimensions & Coordinates

matter.doc = function() {
	var object = {};

	object.selector = $(document);

	object.width = object.selector.width();
	object.height = object.selector.height();
	object.top = 0;
	object.bottom = object.top + object.height;
	object.left = 0;
	object.right = object.left + object.width;

	return object;
}

matter.viewport = function() {
	var object = {};

	object.type = function() {
		return window.getComputedStyle(document.querySelector("body"), ":before").getPropertyValue("content").replace(/\"/g, "");
	};

	object.selector = $(window);

	object.width = object.selector.width();
	object.height = object.selector.height();
	object.top = $(document).scrollTop();
	object.bottom = object.top + object.height;
	object.left = 0;
	object.right = object.left + object.width;

	return object;
}

matter.dimensions = function(element) {
	var object = {};

	object.selector = $(element);

	if ( object.selector.length ) {
		object.width = object.selector.outerWidth();
		object.height = object.selector.outerHeight();
		object.top = object.selector.offset().top;
		object.bottom = object.top + object.height;
		object.left = object.selector.offset().left;
		object.right = object.left + object.width;

		return object;
	} else {
		console.log("System :: " + element + " does not exist (yet)");
	}
}


// Randomisation

matter.randomize = function(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


// Generate unique id from a string

matter.obfuscator = {
	create: function(index, counter) {
		if (typeof counter != "number" || counter <= 0 || (typeof index != "number" && typeof index != "string")) {
			return index;
		}
		index += "";

		while (index.length < counter) {
			index = "0" + index;
		}
		return index;
	},
	getHash: function(string) {
		var hash = 0,
			counter = (typeof string == "string") ? string.length : 0,
			index = 0;
		while (index < counter) {
			hash = ((hash << 5) - hash) + string.charCodeAt(index++);
			//hash = hash & hash; // Convert to 32bit integer
		}

		return (hash < 0) ? ((hash * -1) + 0xFFFFFFFF) : hash; // convert to unsigned
	},
	generate: function(string, bres) {
		var index;
		if (string === undefined || typeof string != "string") {
			if (!matter.obfuscator.uniqueIDCounter) {
				matter.obfuscator.uniqueIDCounter = 0;
			} else {
				++matter.obfuscator.uniqueIDCounter;
			}
			var date = new Date();
			index = string = date.getTime() + "" + matter.obfuscator.uniqueIDCounter;
		} else {
			index = matter.obfuscator.getHash(string);
		}
		return ((bres) ? "res:" : "") + index.toString(32) + "-" + this.create((string.length * 4).toString(16), 3);
	}
}


// URLs

matter.query = {
	get: function(str) { // Gets URL query parameters
		return (str || window.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
			return n = n.split("="), this[n[0]] = n[1], this;
		}.bind({}))[0];
	}
}


// AJAX

matter.data = {
	get: function(url, callback) {
		if ( matter.config.application.debug ) console.log('AJAX ~~ GET (' + url + ')');

		var request = $.ajax({
			url: url,
			type: "GET",
			data: "",
			success: function(data) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ GET Success (" + url + ")", data);
				if ( typeof callback !== "undefined" ) callback(data);
			},
			error: function(request, status, error) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ GET Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	},
	post: function(url, obj, callback) {
		if ( matter.config.application.debug ) console.log('AJAX ~~ POST (' + url + ')');

		console.log(obj);

		var request = $.ajax({
			url: url,
			type: "POST",
			data: obj,
			success: function(data) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ POST Success (" + url + ")", data);

				if ( typeof callback !== "undefined" ) {
					callback(data);
				} else {
					return true;
				}
			},
			error: function(request, status, error) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ POST Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	}
}


// Asynchronous script loading with callback function

matter.script = {
	load: function(src, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;

		if ( callback ) script.onload = callback;
		document.body.appendChild(script);
	}
}


// Popup

matter.popup = function(url, title, width, height) {
	var top = (screen.height / 2) - (height / 2);
	var left = (screen.width / 2) - (width / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+top+', left='+left);
}


// Hyperlinks

matter.anchor = {
	clicked: false,
	init: function() {
		$(document).on("click", "a[href^='#']", function(event) {
			event.preventDefault();

			var el = $(this);
			var link = $.attr(this, "href");

			if ( link === "#" ) {
				if ( matter.config.application.debug ) console.log("System :: Link blocked");
			} else {
				if ( !!link && !el.hasClass("step-trigger") ) {
					matter.anchor.clicked = true;

					$("html, body").animate({
						scrollTop: $(link).offset().top - 40
					}, {
						duration: 1000,
						queue: false,
						complete: function() {
							matter.anchor.clicked = false;
						}
					});

					return false;
				}
			}
		});

		if ( matter.config.application.debug ) console.log("System :: Anchors");
	}
}


// Text functions

matter.text = {
	highlight: function(element, value) {
		var match = RegExp(value, 'gi');

		element.each(function() {
			$(this).filter(function() {
				return match.test($(this).text());
			}).html(function() {
				if ( !value ) return $(this).text();
				return $(this).text().replace(match, '<span class="highlight">$&</span>');
			});
		});
	},
	unhighlight: function(element) {
		element.find("span.highlight").replaceWith(function() {
			return $(this).text();
		});
	},
	resize: function(element) {
		var el = $(element);
		var span = el.children("span");
		var charLimit = matter.config.typography.autoresize.characters;
		var rowLimit = matter.config.typography.autoresize.rows;
		var minFontSize = matter.config.typography.autoresize.minFontSize;
		var maxFontSize = matter.config.typography.autoresize.maxFontSize;
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
}


// SVG Injection

matter.svg = {
	init: function() {
		if ( $("img[src$='.svg']").length ) {
			var svgCount = 0;

			$.each($("img[src$='.svg']"), function(i) {
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

			if ( matter.config.application.debug ) console.log("System :: SVG Injection @ " + svgCount + " images");
		}
	}
}


// Scroll Progress

matter.scroll = {
	init: function() {
		this.update();
		if ( matter.config.application.debug ) console.log("System :: Scroll");
	},
	update: function() {
		var scrollPercentage = (matter.viewport().top * 100) / (matter.doc().height - matter.viewport().height);
		$(".scroll-progress").width(scrollPercentage + "%");
	}
}



// Bar Progress

matter.progress = {
	trigger: function(element, percentage) {
		if ( percentage <= 0 ) percentage = 0;
		if ( percentage >= 100 ) percentage = 100;

		var el = $(element);
		if ( !el.children("div").length ) el.append("<div></div>");

		var counter = el.children("div");
		counter.removeClass("active").width(percentage + "%").attr("data-percentage", percentage);

		if ( percentage >= 7 ) counter.addClass("active");

		if ( matter.config.application.debug ) console.log("Progress :: " + percentage + "%");
	}
}



// Initialisation

var ms = new Date().getTime();
var viewport;

matter.init = function() {
	viewport = matter.viewport().type();
	if ( matter.config.application.touch ) { // If touch device
		FastClick.attach(document.body); // Removes 300ms delay from taps on mobile devices. Requires fastclick.js.
		$(".map-canvas").addClass("map-mobile"); // Fixes image distortion on Google Maps - See styles/core/widgets/_map.scss.
	}

	// Logs Legend

	if ( matter.config.application.debug ) {
		console.log(":: is DOM.ready");
		console.log("~~ is Async");
		console.log("•• is Complete");
		console.log("== is User Action");
		console.log(" ");
	}

	// Easter Eggs Init

	matter.konami.init();

	// System Init

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

	if ( matter.config.application.debug ) console.log("Done •• Matter in " + (new Date().getTime() - ms) + " milliseconds");
}


// DOM Events

$(document).on("ready", matter.init());

$(window)
	.on("load", matter.defer())
	.on("resize", function() {
		viewport = matter.viewport().type();
	})
	.on("scroll", matter.scroll.update);
