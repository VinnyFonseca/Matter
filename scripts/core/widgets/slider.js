// Slider

var sliderInit = function(sliderId) {
	var sliderActive = $('#' + sliderId);
	var slideWrapper = sliderActive.find('.slider-container-wrapper');
	var slideMovable = sliderActive.find('.slider-movable');
	var slide = sliderActive.find('.slider-container');

	var hasBullets = !!sliderActive.attr("data-bullets") ? sliderActive.attr("data-bullets").bool() : config.slider.bullets;
	var hasArrows = !!sliderActive.attr("data-arrows") ? sliderActive.attr("data-arrows").bool() : config.slider.arrows;
	var autoSlide = !!sliderActive.attr("data-slideshow") ? sliderActive.attr("data-slideshow").bool() : config.slider.slideshow;
	var slideAnimation = !!sliderActive.attr("data-animation") ? sliderActive.attr("data-animation") : config.slider.animation;

	var slideTrigger = sliderActive.width() / 6;
	var slideTolerance = 50;
	var slideDirection;

	var animDuration = config.slider.duration;
	var animInterval = config.slider.interval;
	var animating = false;
	var stopped = false;



	// Position Containers

	var sliderWidth = slideWrapper.width();
	var sliderHeight;
	var slideCount = slide.length;
	var isMultiSlide = slideCount > 1;
	var slideStep = sliderWidth * loopUnit;

	var slideCurrent = 0;
	var slideBefore = 0;
	var loopUnit = 0;
	var loopCount = 0;
	var minCount = 0;
	var maxCount = slideCount  - 1;

	var containerPos = function() {
		sliderWidth = slideWrapper.width();
		slide.css({
			'width': sliderWidth
		});

		slideMovable.css({
			'margin-left': slideStep,
			'width': sliderWidth * slideCount,
			'height': slide.eq(slideCurrent).outerHeight(),
			'left': - slideStep
		});
	}
	containerPos();



	// Create Arrows

	var arrowEl =  '<div class="slider-arrow-wrapper">\
						<div class="slider-arrow slider-arrow-prev valign-middle">\
							<img class="svg icon icon-caret-left" src="' + config.application.root + 'img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-caret-left.png\'">\
						</div>\
						<div class="slider-arrow slider-arrow-next valign-middle">\
							<img class="svg icon icon-caret-right" src="' + config.application.root + 'img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-caret-right.png\'">\
						</div>\
					</div>';

	slideWrapper.prepend(arrowEl);

	initSVGs();

	var arrows = sliderActive.find('.slider-arrow');
	var arrowPrev = sliderActive.find('.slider-arrow-prev');
	var arrowNext = sliderActive.find('.slider-arrow-next');

	if ( hasArrows === true && isMultiSlide ) arrows.show();



	// Create Bullets

	var navBullet;

	if ( hasBullets === true && isMultiSlide ) {
		var navWrapperEl = '<div class="slider-nav"></div>';
		sliderActive.append(navWrapperEl);

		var navWrapper = sliderActive.find('.slider-nav');

		for ( var i = 0; i < slideCount; i++ ) {
			var navBulletEl = '<div class="slider-bullet">&bull;</div>';
			navWrapper.append(navBulletEl);
		}

		navBullet = sliderActive.find('.slider-bullet');
	} else {
		navBullet = sliderActive.find('.bullet');
	}

	navBullet.removeClass('active');
	navBullet.eq(slideCurrent).addClass('active');



	// Controls Cloning Functions

	var clone = true;

	var cloneSlide = function() {
		if ( clone ) {
			if ( slideDirection == "prev" ) {
				for ( var i = maxCount; i >= slideCurrent; i-- ) {
					slideMovable.prepend(slide.eq(i));
				}
			}

			if ( slideDirection == "next" ) {
				for ( var j = minCount; j <= slideCurrent; j++ ) {
					slideMovable.append(slide.eq(j - 1));
				}
			}

			slideMovable.css({ 'margin-left': slideStep });

			clone = false;
		}
	}


	// Controls Interaction Functions

	var slidePrev = function() {
		if ( animating === false ) {
			slideDirection = "prev";

			slideBefore = slideCurrent;
			loopUnit--;

			if ( slideCurrent <= minCount ) {
				slideCurrent = maxCount;
				loopCount--;
			} else {
				slideCurrent--;
			}

			slideAction();
		}
	}
	var slideNext = function() {
		if ( animating === false ) {
			slideDirection = "next";

			slideBefore = slideCurrent;
			loopUnit++;

			if ( slideCurrent == maxCount ) {
				slideCurrent = minCount;
				loopCount++;
			} else {
				slideCurrent++;
			}

			slideAction();
		}
	}
	var slideAny = function(i) {
		if ( animating === false ) {
			slideCurrent = i;

			loopUnit = (slideCurrent + ((maxCount + 1) * loopCount));

			if ( slideCurrent < slideBefore ) {
				slideDirection = "prev";
			}
			if ( slideCurrent > slideBefore ) {
				slideDirection = "next";
			}

			slideAction();

			slideBefore = slideCurrent;
		}
	}



	// Main Slider Animation

	var slideTimer;

	var slideAction = function() {
		animating = true;
		slideStep = sliderWidth * loopUnit;

		if ( slideDirection == "prev") cloneSlide();

		if ( slideAnimation === "slide" ) {
			slideMovable.animate({
				'height': slide.eq(slideCurrent).outerHeight(),
				'left': - slideStep
			}, {
				duration: animDuration,
				complete: function() {
					animating = false;
					animDuration = config.slider.duration;
					if ( slideDirection == "next") cloneSlide();
					containerPos();
				}
			});
		}
		if ( slideAnimation === "fade" ) {
			slideMovable
				.hide()
				.css({
					'left': - slideStep
				})
				.fadeIn(animDuration + 250)
				.animate({
					'height': slide.eq(slideCurrent).outerHeight()
				}, {
					duration: animDuration,
					complete: function() {
						animating = false;
						animDuration = config.slider.duration;
					if ( slideDirection == "next") cloneSlide();
						containerPos();
					}
				});
		}

		navBullet.removeClass('active');
		navBullet.eq(slideCurrent).addClass('active');
	}
	slideAction();




	// Nav actions

	arrowNext.on('click', function() {
		clone = true;
		slideNext();
	});
	arrowPrev.on('click', function() {
		clone = true;
		slidePrev();
	});

	navBullet.on('click', function() {
		clone = true;

		var index = $(this).index();
		slideAny(index);

		// $("html, body").animate({
		// 	scrollTop: sliderActive.offset().top - 90
		// }, 1000);
	});

	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which || e.keyCode) {
			case 39: // right
				clone = true;
				slideNext();
				break;

			case 37: // left
				clone = true;
				slidePrev();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault();
	};


	// Dragging if animation = "slider"

	if ( slideAnimation === "slide" ) {
		var down = false,
			cloned = false,
			dragging = false,
			dragStart,
			dragX,
			dragEnd,
			sliderTop = sliderActive.offset().top + (slideTolerance / 2),
			sliderBottom = sliderActive.offset().top + sliderActive.height() - (slideTolerance / 2),
			sliderLeft = sliderActive.offset().left + slideTolerance,
			sliderRight = sliderActive.offset().left + sliderActive.width() - slideTolerance;

		slideMovable
			.on("mousedown touchstart", function(e) {
				if ( !config.application.touch ) e.preventDefault();
				dragStart = e.pageX || e.originalEvent.touches[0].pageX;
				dragX = e.pageX || e.originalEvent.touches[0].pageX;

				clone = true;
				if ( isMultiSlide ) down = true;
			})
			.on("mousemove touchmove", function(e) {
				dragX = e.pageX || e.originalEvent.touches[0].pageX;
				dragY = e.pageY || e.originalEvent.touches[0].pageY;
				initDrag = dragX - dragStart > config.slider.threshold || dragX - dragStart < - config.slider.threshold;

				if ( down && initDrag && !animating ) {
					if ( !config.application.touch ) e.preventDefault();

					dragging = true;

					if ( dragX > dragStart ) {
						if ( !cloned ) {
							slideStep = (sliderWidth * loopUnit) + sliderWidth;
							slideDirection = "prev";

							$('.slide-clone').remove();
							$('.slider-container:last-child').clone().addClass("slide-clone").prependTo(slideMovable);
							slideMovable.css({ 'margin-left': slideStep });

							clone = false;
							cloned = true;
						}
					} else {
						if ( cloned ) {
							slideStep = sliderWidth * loopUnit;
							slideDirection = "prev";

							$('.slide-clone').remove();
							slideMovable.css({ 'margin-left': slideStep });

							clone = true;
							cloned = false;
						}
					}

					slideMovable.css({
						'left': - slideStep - (dragStart - dragX)
					});

					var inBounds = dragX <= sliderLeft || dragX >= sliderRight || dragY <= sliderTop || dragY >= sliderBottom;

					if ( inBounds ) {
						down = false;
						dragging = false;

						if ( dragStart - dragX > slideTrigger ) {
							slideNext();
						} else if ( dragStart - dragX < - slideTrigger ) {
							slidePrev();
						} else {
							clone = false;
							animDuration = 250;
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
						clone = false;
						animDuration = 250;
						slideAction();
					}
				}
			});
	}



	// Slide Show

	var sliderStart = function() {
		slideMovable.removeClass("stopped");
		slideTimer = setInterval(slideNext, animInterval);
	}
	var sliderStop = function() {
		slideMovable.addClass("stopped");
		clearInterval(slideTimer);
	}

	if ( isMultiSlide && autoSlide !== false ) {
		sliderStart();

		if ( !config.application.touch ) {
			sliderActive.on('mouseenter', function() {
				sliderStop();
			});
			sliderActive.on('mouseleave', function() {
				sliderStart();
			});
		} else {
			slideMovable.on('click touchstart', function() {
				sliderStop();
			});

			$("html").on('click touchstart', function(event) {
				if ( !$(event.target).closest(".slider").length && slideMovable.hasClass("stopped") ) {
					sliderStart();
				}
			});
		}
	}

	$(window).on("resize", function() {
		containerPos();
	});
}


var initSliders = function() {
	var slider = $("[data-slider]");

	if ( slider.length ) {
		slider
			.each(function(i, slider) {
				setTimeout(function() {
					sliderInit(slider.id = 'slider-' + i);
				}, 250 * i);
			})
			.find('.slider-container').css({ 'visibility': 'visible' });

		if ( config.application.debug ) console.log("Widget :: Sliders");
	}
}