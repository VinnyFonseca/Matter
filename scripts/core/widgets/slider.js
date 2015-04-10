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
			easedT = easingFunction(time);

		elem.scrollTop = (easedT * (Y - from)) + from;

		if(callback) callback();
	}
}



// Custom Easing

var easing = {
	linear: function (t) { return t },
	easeInQuad: function (t) { return t * t },
	easeOutQuad: function (t) { return t * (2 - t) },
	easeInOutQuad: function (t) { return t < 0.5 ? 2 * t * t :  - 1 + (4 - 2 * t) * t },
	easeInCubic: function (t) { return t * t * t },
	easeOutCubic: function (t) { return (--t) * t * t + 1 },
	easeInOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
	easeInQuart: function (t) { return t * t * t * t },
	easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
	easeInOutQuart: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
	easeInQuint: function (t) { return t * t * t * t * t },
	easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
	easeInOutQuint: function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}




// ----------------------------------------------------------------------- //


// Console Log Fix

if (!window.console) console = { log: function() {} };




// ----------------------------------------------------------------------- //

// Slider Init Function

String.prototype.bool = function() {
    return (/^true$/i).test(this);
};

function sliderInit(sliderId) {
	var sliderActive = $('#' + sliderId);
	var containerWrapper = sliderActive.find('.slider-container-wrapper');
	var container = sliderActive.find('.slider-container');
	var movable = sliderActive.find('.slider-movable');

	var navBullets = !!sliderActive.attr("data-bullets") ? sliderActive.attr("data-bullets").bool() : config.slider.bullets;
	var navArrows = !!sliderActive.attr("data-arrows") ? sliderActive.attr("data-arrows").bool() : config.slider.arrows;
	var slideShow = !!sliderActive.attr("data-slideshow") ? sliderActive.attr("data-slideshow").bool() : config.slider.slideshow;
	var slideAnimation = !!sliderActive.attr("data-animation") ? sliderActive.attr("data-animation") : config.slider.animation;
	var slideTrigger = sliderActive.width() / 6;
	var slideTolerance = 50;


	var animDuration = config.slider.duration;
	var animInterval = config.slider.interval;



	// Position Containers

	var sliderWidth = sliderActive.width();
	var sliderHeight;
	var movePos = 0;


	container.clone().prependTo(movable);
	container = sliderActive.find('.slider-container');
	container.css({'width': sliderWidth});

	var uniqueCount = (container.length / 2);
	var isMultiSlide = uniqueCount > 1;


	function containerPos() {
		sliderWidth = sliderActive.width();
		container.css({
			'width': sliderWidth
		});

		movable.css({
			'margin-left': sliderWidth * (loopUnit - uniqueCount),
			'width': sliderWidth * container.size(),
			'height': container.eq(slideCurrent % uniqueCount).height(),
			'left': - sliderWidth * loopUnit
		});
	}
	containerPos();



	// Create Arrows

	var arrowEl =  '<div class="slider-arrow-wrapper">\
						<div class="slider-arrow slider-arrow-prev valign-middle">\
							<img class="svg icon icon-caret-left" src="img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-left.png\'">\
						</div>\
						<div class="slider-arrow slider-arrow-next valign-middle">\
							<img class="svg icon icon-caret-right" src="img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-caret-right.png\'">\
						</div>\
					</div>';

	containerWrapper.prepend(arrowEl);

	initSVGs();

	var arrows = sliderActive.find('.slider-arrow');
	var arrowPrev = sliderActive.find('.slider-arrow-prev');
	var arrowNext = sliderActive.find('.slider-arrow-next');

	if ( navArrows === true && isMultiSlide ) arrows.show();



	// Create Bullets

	var navBullet;

	if ( navBullets === true && isMultiSlide ) {
		var navWrapperEl = '<div class="slider-nav"></div>';
		sliderActive.append(navWrapperEl);

		var navWrapper = sliderActive.find('.slider-nav');

		for ( var i = 0; i < uniqueCount; i++ ) {
			var navBulletEl = '<div class="slider-bullet">&bull;</div>';
			navWrapper.append(navBulletEl);
		}

		navBullet = sliderActive.find('.slider-bullet');
	} else {
		navBullet = sliderActive.find('.bullet');
	}



	// Custom Animate Functions

	var animating = false;
	var stopped = false;

	var slideCurrent = 0;
	var slideBefore = 0;
	var loopUnit = 0;
	var loopCount = 0;
	var minCount = 0;
	var maxCount = container.length  - 1;



	// Controls Cloning Functions

	var direction;

	function cloneSlide() {
		if ( direction == "prev" ) {
			for ( var i = maxCount; i >= slideCurrent; i-- ) {
				movable.prepend(container.eq(i));
			}
		} else {
			for ( var j = minCount; j <= slideCurrent; j++ ) {
				movable.append(container.eq(j - 1));
			}
		}

		movable.css({ 'margin-left': sliderWidth * (loopUnit - uniqueCount) });
	}


	// Controls Interaction Functions

	function slidePrev() {
		if ( animating === false ) {
			direction = "prev";

			slideBefore = slideCurrent;
			loopUnit--;

			if ( slideCurrent <= minCount ) {
				slideCurrent = maxCount;
				loopCount--;
			} else {
				slideCurrent--;
			}

			cloneSlide();
			slideAction();
		}
	}
	function slideNext() {
		if ( animating === false ) {
			direction = "next";

			slideBefore = slideCurrent;
			loopUnit++;

			if ( slideCurrent == maxCount ) {
				slideCurrent = minCount;
				loopCount++;
			} else {
				slideCurrent++;
			}

			cloneSlide();
			slideAction();
		}
	}
	function slideAny(i) {
		if ( animating === false ) {
			if ( slideCurrent < uniqueCount ) {
				slideCurrent = i;
			} else {
				slideCurrent = i + uniqueCount;
			}

			loopUnit = (slideCurrent + ((maxCount + 1) * loopCount));

			if ( slideCurrent < slideBefore ) {
				direction = "prev";
			}
			if ( slideCurrent > slideBefore ) {
				direction = "next";
			}

			cloneSlide();
			slideAction();

			slideBefore = slideCurrent;
		}
	}



	// Main Slider Animation

	var slideTimer;

	function slideAction() {
		animating = true;
		movePos = - (sliderWidth * loopUnit);

		if ( slideAnimation === "slide" ) {
			movable.animate({
				'height': container.eq(slideCurrent % uniqueCount).height(),
				'left': movePos
			}, {
				duration: animDuration,
				complete: function() {
					animating = false;
					animDuration = config.slider.duration;
					containerPos();
				}
			});
		}
		if ( slideAnimation === "fade" ) {
			movable
				.hide()
				.css({
					'left': movePos
				})
				.fadeIn(animDuration + 250)
				.animate({
					'height': container.eq(slideCurrent % uniqueCount).height()
				}, {
					duration: animDuration,
					complete: function() {
						animating = false;
						animDuration = config.slider.duration;
						containerPos();
					}
				});
		}

		navBullet.removeClass('active');
		navBullet.eq(slideCurrent % uniqueCount).addClass('active');
	}
	slideAction();




	// Nav actions

	arrowNext.on('click', function() {
		slideNext();
	});
	arrowPrev.on('click', function() {
		slidePrev();
	});

	navBullet.on('click', function() {
		var index = $(this).index();
		slideAny(index);

		var elementTop = getOffset(sliderActive).top - 100;
		scrollTo(elementTop, 350, easing.easeOutQuad);
	});


	// Dragging if animation = "slider"

	if ( slideAnimation === "slide" ) {
		var down = false,
			dragging = false,
			dragStart,
			dragX,
			dragEnd,
			sliderTop = sliderActive.offset().top + (slideTolerance / 2),
			sliderBottom = sliderActive.offset().top + sliderActive.height() - (slideTolerance / 2),
			sliderLeft = sliderActive.offset().left + slideTolerance,
			sliderRight = sliderActive.offset().left + sliderActive.width() - slideTolerance;

		movable
			.on("mousedown touchstart", function(e) {
				if ( !config.application.touch ) e.preventDefault();
				dragStart = e.pageX || e.originalEvent.touches[0].pageX;
				dragX = e.pageX || e.originalEvent.touches[0].pageX;

				down = true;
			})
			.on("mousemove touchmove", function(e) {
				dragX = e.pageX || e.originalEvent.touches[0].pageX;
				dragY = e.pageY || e.originalEvent.touches[0].pageY;
				initDrag = dragX - dragStart > config.slider.threshold || dragX - dragStart < -config.slider.threshold;

				if ( down && initDrag && !animating) {
					if ( !config.application.touch ) e.preventDefault();

					dragging = true;

					movable.css({
						'left': movePos - (dragStart - dragX)
					});

					var inBounds = dragX <= sliderLeft || dragX >= sliderRight || dragY <= sliderTop || dragY >= sliderBottom;

					if ( inBounds ) {
						if ( dragStart - dragX > slideTrigger ) {
							down = false;
							dragging = false;
							slideNext();
						} else if ( dragStart - dragX < - slideTrigger ) {
							down = false;
							dragging = false;
							slidePrev();
						} else {
							animDuration = 250;
							down = false;
							dragging = false;
							slideAction();
						}
					}
				}
			})
			.on("mouseleave mouseup touchend", function(e) {
				if ( !config.application.touch ) e.preventDefault();

				down = false;

				if ( dragging && !animating ) {
					dragging = false;
					dragEnd = dragX;

					if ( dragStart - dragEnd > slideTrigger ) {
						slideNext();
					} else if ( dragStart - dragEnd < - slideTrigger ) {
						slidePrev();
					} else {
						slideAction();
					}
				}
			});
	}


	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which || e.keyCode) {
			case 39: // right
				slideNext();
				break;

			case 37: // left
				slidePrev();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault();
	};



	// Slide Show

	function sliderStart() {
		movable.removeClass("stopped");
		slideTimer = setInterval(slideNext, animInterval);
	}
	function sliderStop() {
		movable.addClass("stopped");
		clearInterval(slideTimer);
	}

	if ( slideShow !== false && isMultiSlide ) {
		sliderStart();

		if ( !config.application.touch ) {
			sliderActive.on('mouseenter', function() {
				sliderStop();
			});
			sliderActive.on('mouseleave', function() {
				sliderStart();
			});
		} else {
			movable.on('click touchstart', function() {
				sliderStop();
			});

			$("html").on('click touchstart', function(event) {
				if (
					!$(event.target).closest(".slider").length &&
					movable.hasClass("stopped")
				) {
					sliderStart();
				}
			});
		}
	}

	$(window).on("resize", function() {
		containerPos();
	});
}


function initSliders() {
	var slider = $("[data-slider]");

	if ( slider.length ) {
		slider
			.each(function (i, slider) {
				setTimeout(function() {
					sliderInit(slider.id = 'slider-' + i);
				}, 250 * i);
			})
			.find('.slider-container').css({ 'visibility': 'visible' });

		if ( config.application.debug ) console.log("Widget :: Sliders");
	}
}