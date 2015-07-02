// Slider

var sliderInit = function(sliderId) {
	var sliderActive = $('#' + sliderId);
	var slideContainerEl = '<div class="slider-container"></div>';
	var slideMovableEl = '<div class="slider-movable"></div>';

	sliderActive.append(slideContainerEl);
	var slideContainer = sliderActive.find('.slider-container');

	slideContainer.append(slideMovableEl);
	var slideMovable = sliderActive.find('.slider-movable');

	var slide = sliderActive.find('.slide');
	slide.each(function() { $(this).attr("data-index", $(this).index()) }).appendTo(slideMovable);


	var hasNav = !!sliderActive.attr("data-nav") ? sliderActive.attr("data-nav").bool() : config.slider.nav;
	var hasArrows = !!sliderActive.attr("data-arrows") ? sliderActive.attr("data-arrows").bool() : config.slider.arrows;
	var hasThumbnails = !!sliderActive.attr("data-thumbnails") ? sliderActive.attr("data-thumbnails").bool() : config.slider.thumbnails;
	var slideAnimation = !!sliderActive.attr("data-animation") ? sliderActive.attr("data-animation") : config.slider.animation;
	var autoSlide = !!sliderActive.attr("data-slideshow") ? sliderActive.attr("data-slideshow").bool() : config.slider.slideshow;

	var animDuration = config.slider.duration;
	var animInterval = config.slider.interval;
	var animating = false;
	var stopped = false;



	// Position Containers

	var slideCount = slide.length;
	var slideCurrent = 0;
	var slideBefore = 0;
	var loopUnit = 0;
	var loopCount = 0;
	var minCount = 0;
	var maxCount = slideCount  - 1;

	var sliderWidth = slide.eq(slideCurrent).outerWidth(true);
	var sliderHeight = slide.eq(slideCurrent).outerHeight(true);
	var isMultiSlide = slideCount > 1;
	var slideStep = sliderWidth;
	var slideTrigger = sliderWidth / 4;
	var slideTolerance = 50;
	var slideDirection;



	// Slide Show

	var slideTimer;

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



	// Create Arrows

	var arrowPrevEl =  '<div class="slider-arrow slider-arrow-prev valign-middle">\
							<img class="svg icon icon-caret-left" src="' + config.application.root + 'img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-caret-left.png\'">\
					    </div>';
	var arrowNextEl =  '<div class="slider-arrow slider-arrow-next valign-middle">\
							<img class="svg icon icon-caret-right" src="' + config.application.root + 'img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-caret-right.png\'">\
					    </div>';

	slideContainer.prepend(arrowPrevEl);
	slideContainer.prepend(arrowNextEl);

	initSVGs();

	var arrows = slideContainer.children('.slider-arrow');
	var arrowPrev = slideContainer.children('.slider-arrow-prev');
	var arrowNext = slideContainer.children('.slider-arrow-next');

	if ( hasArrows === true && isMultiSlide ) arrows.show();



	// Create Bullets

	var navBullet;

	if ( hasNav === true && isMultiSlide ) {
		var navWrapperEl = '<div class="slider-nav"></div>';
		sliderActive.append(navWrapperEl);

		var navWrapper = sliderActive.children('.slider-nav');

		for ( var i = 0; i < slideCount; i++ ) {
			var navBulletEl = "";

			var slideThumb = slide.eq(i);
			var slideImg = slideThumb.data("thumb");

			if ( slide.eq(i).hasClass("thumb") ) slideThumb.css({ "background-image": "url('img/pictures/slider/" + slideImg + "')" });

			if ( hasThumbnails ) {
				navBulletEl = '<div class="slider-bullet" style="background: url(\'img/pictures/slider/thumbs/' + slideImg + '\') no-repeat center center;">&nbsp;</div>';
				navWrapper.addClass("thumbs");
			} else {
				navBulletEl = '<div class="slider-bullet">&bull;</div>';
			}

			navWrapper.append(navBulletEl);
		}

		navBullet = sliderActive.find('.slider-bullet');
	} else {
		navBullet = sliderActive.find('.bullet');
	}

	navBullet.removeClass('active');
	navBullet.eq(slideCurrent).addClass('active');



	// Main container repositioning

	var containerPos = function() {
		slideMovable.css({
			'margin-left': 0,
			'left': 0,
			'height': sliderHeight
		});

		sliderTop = sliderActive.offset().top + (slideTolerance / 2),
		sliderBottom = sliderActive.offset().top + sliderActive.height() - (slideTolerance / 2),
		sliderLeft = sliderActive.offset().left + slideTolerance,
		sliderRight = sliderActive.offset().left + sliderActive.width() - slideTolerance;
		slideTrigger = sliderWidth / 4;
	}

	containerPos();



	// Controls Cloning Functions

	var clone = true;

	var slideClone = function() {
		if ( clone && !cloned ) {
			if ( slideDirection == "prev" ) {
				for ( var i = maxCount; i >= slideCurrent; i-- ) {
					slideMovable.prepend(slide.eq(i));
				}
			}
			if ( slideDirection == "next" ) {
				slide.each(function() {

				})
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
		if ( !animating ) {
			slideDirection = "prev";


			if ( slideCurrent <= minCount ) {
				slideCurrent = maxCount;
			} else {
				slideCurrent--;
			}

			slideAction(-1);
			slideBefore = slideCurrent;
		}
	}
	var slideNext = function() {
		if ( !animating ) {
			slideDirection = "next";


			if ( slideCurrent >= maxCount ) {
				slideCurrent = minCount;
			} else {
				slideCurrent++;
			}

			slideAction(1);
			slideBefore = slideCurrent;
		}
	}
	var slideAny = function(i) {
		if ( !animating ) {
			slideCurrent = i;

			if ( slideCurrent < slideBefore ) slideDirection = "prev";
			if ( slideCurrent > slideBefore ) slideDirection = "next";

			slideAction(slideCurrent - slideBefore);
			slideBefore = slideCurrent;
		}
	}



	// Main Slider Animation

	var slideEnd = function() {
		clone = true;
		cloned = false;
		animating = false;
		animDuration = config.slider.duration;

		if ( slideDirection == "next" ) slideClone();
		containerPos();
	}

	var slideAction = function(i) {
		animating = true;
		slideStep = sliderWidth * i;

		sliderWidth = slide.eq(slideCurrent).outerWidth(true);
		sliderHeight = slide.eq(slideCurrent).outerHeight(true);


		if ( slideDirection == "prev" ) slideClone();

		if ( slideAnimation === "slide" ) {
			slideMovable
			.stop(true, false)
			.animate({
				'height': sliderHeight,
				'left': - slideStep
			}, {
				duration: animDuration,
				complete: slideEnd
			});
		}
		if ( slideAnimation === "fade" ) {
			slideMovable
				.hide()
				.css({
					'left': slideStep
				})
				.fadeIn(animDuration * 1.5)
				.stop(true, false)
				.animate({
					'height': sliderHeight
				}, {
					duration: animDuration,
					complete: slideEnd
				});
		}

		navBullet.removeClass('active');
		navBullet.eq(slideCurrent).addClass('active');
	}

	slideAction(0);

	$(window).on("resize", function() {
		slideAction(0);
	});



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
		slideAny($(this).index());
	});

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

		var slideKickback = function() {
			animDuration = 250;

			setTimeout(function() {
				if ( cloned ) {
					slideDirection = "prev";

					sliderActive.find('.slide:first-child').appendTo(slideMovable);
					slideMovable.css({ 'margin-left': 0 });

					cloned = false;
				}
			}, animDuration);
		}

		slideMovable.on("mousedown touchstart", function(e) {
			if ( !config.application.touch ) e.preventDefault();
			dragStart = e.pageX || e.originalEvent.touches[0].pageX;
			dragX = e.pageX || e.originalEvent.touches[0].pageX;

			if ( isMultiSlide ) down = true;
		})
		.on("mousemove touchmove", function(e) {
			dragX = e.pageX || e.originalEvent.touches[0].pageX;
			dragY = e.pageY || e.originalEvent.touches[0].pageY;

			var dragNext = dragStart - dragX;
			var dragPrev = dragX - dragStart;
			initDrag = dragPrev > config.slider.threshold || dragNext > config.slider.threshold;

			if ( down && initDrag && !animating ) {
				if ( !config.application.touch ) e.preventDefault();

				dragging = true;

				if ( dragX > dragStart ) {
					if ( !cloned ) {
						slideDirection = "prev";
						sliderActive.find('.slide:last-child').prependTo(slideMovable);
						slideMovable.css({ 'margin-left': - sliderWidth });
						cloned = true;
					}
				} else {
					clone = true;

					if ( cloned ) {
						slideDirection = "prev";
						sliderActive.find('.slide:first-child').appendTo(slideMovable);
						slideMovable.css({ 'margin-left': 0 });
						cloned = false;
					}
				}

				slideMovable.css({
					'left': - (dragStart - dragX)
				});

				var inBounds = dragX <= sliderLeft || dragX >= sliderRight || dragY <= sliderTop || dragY >= sliderBottom || dragNext >= sliderWidth || dragPrev >= sliderWidth;

				if ( inBounds ) {
					down = false;
					dragging = false;

					if ( dragStart - dragX > slideTrigger ) {
						slideNext();
					} else if ( dragX - dragStart > slideTrigger ) {
						slidePrev();
					} else {
						slideKickback();
						slideAction(0);
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
					slideKickback();
					slideAction(0);
				}
			}
		});
	}
}



var initSliders = function() {
	var slider = $("[data-slider='true']");

	if ( slider.length ) {
		slider
			.each(function(i, slider) {
				setTimeout(function() {
					sliderInit(slider.id = 'slider-' + i);
				}, 250 * i);
			})
			.find('.slide').css({ 'visibility': 'visible' });

		if ( config.application.debug ) console.log("Widget :: Sliders");
	}
}