// Request Animation Frame

var _requestAnimationFrame = function(win, t) {
  return win["webkitR" + t] || win["r" + t] || win["mozR" + t]
		  || win["msR" + t] || function(fn) { setTimeout(fn, 60) }
}(window, "requestAnimationFrame");


// Custom Swipe detection

// function swipedetect(el, callback){
// 	var touchsurface = el,
// 		swipedir,
// 		startX,
// 		startY,
// 		distX,
// 		distY,
// 		threshold = 150, //required min distance traveled to be considered swipe
// 		restraint = 200, // maximum distance allowed at the same time in perpendicular direction
// 		allowedTime = 300, // maximum time allowed to travel that distance
// 		elapsedTime,
// 		startTime,
// 		handleswipe = callback || function(swipedir) {}

// 	touchsurface.addEvent('touchstart', function(e){
// 		var touchobj = e.changedTouches[0];
// 		swipedir = 'none';
// 		dist = 0;
// 		startX = touchobj.pageX;
// 		startY = touchobj.pageY;
// 		startTime = new Date().getTime(); // record time when finger first makes contact with surface
// 		// e.preventDefault();
// 	}, false);

// 	touchsurface.addEvent('touchmove', function(e){
// 		// e.preventDefault(); // prevent scrolling when inside DIV
// 	}, false);

// 	touchsurface.addEvent('touchend', function(e){
// 		var touchobj = e.changedTouches[0];
// 		distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
// 		distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
// 		elapsedTime = new Date().getTime() - startTime; // get time elapsed
// 		if ( elapsedTime <= allowedTime ) { // first condition for awipe met
// 			if ( Math.abs(distX) >= threshold && Math.abs(distY) <= restraint ) { // 2nd condition for horizontal swipe met
// 				swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
// 			} else if ( Math.abs(distY) >= threshold && Math.abs(distX) <= restraint ) { // 2nd condition for vertical swipe met
// 				swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
// 			}
// 		}
// 		handleswipe(swipedir);
// 		// e.preventDefault();
// 	}, false);
// }


// Custom Animate Functions

function animate(opts) {
	var start = new Date;

	var id = setInterval(function() {
		var timePassed = new Date - start;
		var progress = timePassed / opts.duration;

		if (progress > 1) progress = 1;

		var delta = opts.delta(progress);
		opts.step(delta);

		if (progress == 1) {
			clearInterval(id);
			animEndCallback();
		}
	}, opts.delay);
}

function quad(progress) {
	return Math.pow(progress, 2);
}
function makeEaseOut(delta) {
	return function(progress) {
		return 1 - delta(1 - progress);
	};
}


// Custom Get Element Position

function getOffset(el) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft;
		_y += el.offsetTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}


// Custom Scroll

function scrollTo(Y, duration, easingFunction, callback) {
	var start = Date.now = Date.now || function() { return +new Date; };
	var elem = document.documentElement.scrollTop ? document.documentElement : document.body;
	var from = elem.scrollTop;

	if( from === Y ) {
		if ( typeof callback != 'undefined' ) {
			callback();
		}
		return; /* Prevent scrolling to the Y point if already there */
	}

	function min(a, b) {
		return a < b ? a : b;
	}

	function scroll(timestamp) {
		var currentTime = Date.now(),
			time = min(1, ((currentTime - start) / duration)),
			easedT = easingFunction(time);

		elem.scrollTop = (easedT * (Y - from)) + from;

		if(time < 1) requestAnimationFrame(scroll);
		else
			if(callback) callback();
	}

	// _requestAnimationFrame(scroll);
}


// Custom Easing

var easing = {
	linear: function (t) { return t },
	easeInQuad: function (t) { return t*t },
	easeOutQuad: function (t) { return t*(2-t) },
	easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	easeInCubic: function (t) { return t*t*t },
	easeOutCubic: function (t) { return (--t)*t*t+1 },
	easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	easeInQuart: function (t) { return t*t*t*t },
	easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	easeInQuint: function (t) { return t*t*t*t*t },
	easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}



// ----------------------------------------------------------------------- //


// Console Log Fix

if (!window.console) console = { log: function() {} };



// ----------------------------------------------------------------------- //

// Slider Options

var continuous = true;


// Slider Init Function

function sliderInit(sliderId) {
	var sliderActive = $('#' + sliderId);
	var containerWrapper = sliderActive.find('.slider-container-wrapper');
	var container = sliderActive.find('.slider-container');
	var movable = sliderActive.find('.slider-movable');

	var navBullets = sliderActive.attr("data-bullets") == "true" ? true : false;
	var navArrows = sliderActive.attr("data-arrows") == "true" ? true : false;
	var slideShow = sliderActive.attr("data-slideshow") == "true" ? true : false;

	var animDuration = config.slider.duration;
	var animInterval = config.slider.interval;

	var isMultiSlide = container.length > 1;



	// Create Arrows

	var arrowPrevEl = '<div class="slider-arrow slider-arrow-prev"><span>&lsaquo;</span></div>';
	var arrowNextEl = '<div class="slider-arrow slider-arrow-next"><span>&rsaquo;</span></div>';

	containerWrapper.prepend(arrowPrevEl);
	containerWrapper.prepend(arrowNextEl);

	var arrows = sliderActive.find('.slider-arrow');
	var arrowPrev = sliderActive.find('.slider-arrow-prev');
	var arrowNext = sliderActive.find('.slider-arrow-next');

	if ( navArrows === true && isMultiSlide ) arrows.show();



	// Create Bullets

	if ( navBullets === true && isMultiSlide ) {
		var navWrapperEl = '<div class="slider-nav"></div>';

		sliderActive.append(navWrapperEl);

		var navWrapper = sliderActive.find('.slider-nav');

		for ( var i = 0; i < container.length; i++ ) {
			var navBulletEl = '<div class="slider-bullet">&bull;</div>';
			navWrapper.append(navBulletEl);
		}

		var navBullet = sliderActive.find('.slider-bullet');
	} else {
		var navBullet = sliderActive.find('.bullet');
	}



	// Position Containers

	var sliderWidth;
	var sliderHeight;
	var movePos = 0;

	var slideCurrent = 0;
	var slideBefore = 0;
	var loopUnit = 0;
	var loopCount = 0;
	var min = 0;
	var max = container.size() - 1;

	function containerPos() {
		sliderWidth = sliderActive.width();
		// sliderHeight = container.outerHeight();

		container.css({ 'width': sliderWidth });

		// if ( isMultiSlide ) arrows.css({ 'margin-top': (sliderHeight - arrows.outerHeight()) / 2 });

		movable.css({
			'margin-left': sliderWidth * loopUnit,
			'width': sliderWidth * container.size(),
			'left': - sliderWidth * loopUnit
		}).animate({
			'height': container.eq(slideCurrent).height()
		}, animDuration);
	}
	containerPos();



	// Custom Animate Functions

	var animating = false;
	var stopped = false;

	function animationEnd() {
		if ( direction == "next" ) cloneSlide();
		if ( direction == "any" && !isBefore ) cloneSlide();
	}



	// Controls Cloning Functions

	var direction;
	var isBefore;

	function cloneSlide() {
		if ( continuous === true ) {
			if ( direction == "prev" ) {
				for ( var i = max; i >= slideCurrent; i-- ) {
					movable.prepend(container.eq(i));
				}
			} else {
				for ( var i = min; i <= slideCurrent; i++ ) {
					movable.append(container.eq(i - 1));
				}
			}

			movable.css({ 'margin-left': sliderWidth * loopUnit });
		}
	}


	// Controls Interaction Functions

	function slidePrev() {
		if ( animating === false ) {
			direction = "prev";
			loopUnit--;

			if ( slideCurrent <= min ) {
				slideCurrent = max;
				loopCount--;
			} else {
				slideCurrent--;
			}

			slideBefore = slideCurrent + 1;

			cloneSlide();
			slideAction();
		}
	}
	function slideNext() {
		if ( animating === false ) {
			direction = "next";
			loopUnit++;

			if ( slideCurrent == max ) {
				slideCurrent = min;
				loopCount++;
			} else {
				slideCurrent++;
			}

			slideBefore = slideCurrent - 1;

			slideAction();
		}
	}
	function slideAny(i) {
		if ( animating === false ) {
			slideCurrent = i;

			loopUnit = (i + ((max + 1) * loopCount));

			if ( slideCurrent < slideBefore ) {
				direction = "prev";
				cloneSlide();
			} else {
				direction = "next";
			}

			slideAction();
			slideBefore = i;
		}
	}



	// Main Slider Animation

	var slideTimer;

	function slideAction() {
		animating = true;
		movePos = - (sliderWidth * loopUnit);

		movable.animate({
			'height': container.eq(slideCurrent).height(),
			'left': movePos
		}, {
			duration: animDuration,
			complete: function() {
				animating = false;
				animationEnd();
				containerPos();
			}
		});

		navBullet.removeClass('active');
		navBullet.eq(slideCurrent).addClass('active');
	}
	slideAction();




	// Nav actions

	arrowPrev.on('click', slidePrev);
	arrowNext.on('click', slideNext);

	function stopSlider() {
		stopped = true;

		setTimeout(function() {
			movable.addClass("stopped");
		}, 150);
	}

	function startSlider() {
		stopped = false;
		movable.removeClass("stopped");
	}

	navBullet.on('click', function() {
		var index = $(this).index();
		slideAny(index);

		var elementTop = getOffset(sliderActive).top - 100;
		scrollTo(elementTop, 350, easing.easeOutQuad);
	});



	// Touch Events

	// var sliderActiveJS = document.getElementById(sliderId);

	// swipedetect(sliderActiveJS, function(swipedir) {
	// 	if ( swipedir =='left' ) {
	// 		slideNext();
	// 	}
	// 	if ( swipedir =='right' ) {
	// 		slidePrev();
	// 	}
	// });


	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which || e.keyCode) {
			case 37: // left
				slidePrev();
				break;

			case 39: // right
				slideNext();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault();
	};



	// Slide Show

	function sliderStart() {
		movable.removeClass("stopped");
		slideTimer = setInterval(slideNext, interval);
	}
	function sliderStop() {
		movable.addClass("stopped");
		clearInterval(slideTimer);
	}

	if ( slideShow !== false && isMultiSlide ) {
		var interval = animInterval;

		sliderStart();

		if ( !config.application.touch ) {
			sliderActive.on('mouseenter', function() {
				sliderStop();
			});
			sliderActive.on('mouseleave', function() {
				sliderStart();
			});
		} else {
			movable.on('click touch', function() {
				sliderStop();
			});

			$("html").on('click touch', function(event) {
				if (
					!$(event.target).closest(".slider-container-wrapper").length &&
					!$(event.target).closest(".slider-bullet").length &&
					movable.hasClass("stopped")
				) {
					sliderStart();
				};
			});
		}
	}

	window.resize = function() {
		containerPos();
		var startStop = config.application.touch ? sliderStop() : sliderStart();
	};
}