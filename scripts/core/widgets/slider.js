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
	slide.appendTo(slideMovable);

	var hasNav = !!sliderActive.attr("data-nav") ? sliderActive.attr("data-nav").bool() : config.slider.nav;
	var hasArrows = !!sliderActive.attr("data-arrows") ? sliderActive.attr("data-arrows").bool() : config.slider.arrows;
	var hasThumbnails = !!sliderActive.attr("data-thumbnails") ? sliderActive.attr("data-thumbnails").bool() : config.slider.thumbnails;
	var autoSlide = !!sliderActive.attr("data-slideshow") ? sliderActive.attr("data-slideshow").bool() : config.slider.slideshow;
	var slideAnimation = !!sliderActive.attr("data-animation") ? sliderActive.attr("data-animation") : config.slider.animation;

	var animDuration = config.slider.duration;
	var animInterval = config.slider.interval;
	var animating = false;
	var stopped = false;



	// Position Containers

	var sliderWidth = sliderActive.width();
	var sliderHeight;
	var slideCount = slide.length;
	var isMultiSlide = slideCount > 1;
	var slideStep = sliderWidth * loopUnit;
	var slideTrigger = sliderWidth / 6;
	var slideTolerance = 50;
	var slideDirection;

	var slideCurrent = 0;
	var slideBefore = 0;
	var loopUnit = 0;
	var loopCount = 0;
	var minCount = 0;
	var maxCount = slideCount  - 1;



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

			if ( hasThumbnails ) {
				var thumbSlide = slide.eq(i);
				var slideImg = thumbSlide.data("thumb");


				thumbSlide.css({ "background-image": "url('" + slideImg + "')" });
				navBulletEl = '<div class="slider-bullet" style="background: url(\'' + slideImg + '\') no-repeat center center;">&nbsp;</div>';

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
		sliderWidth = sliderActive.width();

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



	// Controls Cloning Functions

	var clone = true;

	var cloneSlide = function() {
		if ( clone && !cloned ) {
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



	// Partial Controls Interaction Functions

	var isPartial = !!sliderActive.attr("data-partial") ? sliderActive.attr("data-partial").bool() : false;
	var partialMin = 0;
	var partialMax = slide.find(".part").length;
	var partialCount = 0;
	var partialCycle = 0;
	var partialWidth = slide.find(".part").outerWidth();

	var slidePartialPrev = function() {
		partialCurrent = slide.eq(slideCurrent).children(".part").length;

		partialCount > 0 ? partialCount-- : partialCount = 0;
		partialCycle > 0 ? partialCycle-- : partialCycle = partialCurrent;

		console.log(partialMin, partialCount, partialCycle, partialCurrent);

		if ( partialCycle > partialMin ) {
			slideStep = (sliderWidth * loopUnit) - (partialWidth * partialCycle);

			slideMovable.animate({
				'left': - slideStep
			}, animDuration);
		} else {
			partialCycle = partialCurrent;

			if ( slideCurrent > minCount ) {
				slideCurrent--;
			} else {
				slideCurrent = maxCount;
			}

			slideAny(slideCurrent);
		}
	}
	var slidePartialNext = function() {
		partialCurrent = slide.eq(slideCurrent).children(".part").length;

		partialCount < partialMax ? partialCount++ : partialCount - partialMax;
		partialCycle < partialMax ? partialCycle++ : partialCycle - partialMax;

		if ( partialCycle < partialCurrent ) {
			slideStep = (sliderWidth * loopUnit) + (partialWidth * partialCycle);

			slideMovable.animate({
				'left': - slideStep
			}, animDuration);
		} else {
			partialCycle = 0;

			if ( slideCurrent < maxCount ) {
				slideCurrent++;
			} else {
				slideCurrent = 0;
			}

			slideAny(slideCurrent);
		}
	}



	// Controls Interaction Functions

	var slidePrev = function() {
		if ( !animating ) {
			slideDirection = "prev";

			loopUnit--;

			if ( slideCurrent <= minCount ) {
				slideCurrent = maxCount;
				loopCount--;
			} else {
				slideCurrent--;
			}

			slideAction();
			slideBefore = slideCurrent;
		}
	}
	var slideNext = function() {
		if ( !animating ) {
			slideDirection = "next";

			loopUnit++;

			if ( slideCurrent == maxCount ) {
				slideCurrent = minCount;
				loopCount++;
			} else {
				slideCurrent++;
			}

			slideAction();
			slideBefore = slideCurrent;
		}
	}
	var slideAny = function(i) {
		if ( !animating ) {
			slideCurrent = i;

			loopUnit = (slideCurrent + ((maxCount + 1) * loopCount));

			if ( slideCurrent < slideBefore ) slideDirection = "prev";
			if ( slideCurrent > slideBefore ) slideDirection = "next";

			slideAction();
			slideBefore = slideCurrent;
		}
	}



	// Main Slider Animation

	var slideTimer;

	var slideAction = function() {
		animating = true;
		slideStep = sliderWidth * loopUnit;

		if ( isPartial ) {
			partialCurrent = slide.eq(slideCurrent).children(".part").length;
			partialCycle = 0;
		}

		if ( slideDirection == "prev" ) cloneSlide();

		var slideEnd = function() {
			clone = true;
			cloned = false;
			animating = false;
			animDuration = config.slider.duration;

			if ( slideDirection == "next" ) cloneSlide();
			containerPos();
		}

		if ( slideAnimation === "slide" ) {
			slideMovable.animate({
				'height': slide.eq(slideCurrent).outerHeight(),
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
					'left': - slideStep
				})
				.fadeIn(animDuration * 1.5)
				.animate({
					'height': slide.eq(slideCurrent).outerHeight()
				}, {
					duration: animDuration,
					complete: slideEnd
				});
		}

		navBullet.removeClass('active');
		navBullet.eq(slideCurrent).addClass('active');
	}
	slideAction();



	// Nav actions

	arrowNext.on('click', function() {
		if ( isPartial ) {
			slidePartialNext();
		} else {
			slideNext();
		}
	});
	arrowPrev.on('click', function() {
		if ( isPartial ) {
			slidePartialPrev();
		} else {
			slidePrev();
		}
	});

	navBullet.on('click', function() {
		var index = $(this).index();
		slideAny(index);
	});

	document.onkeydown = function(e) {
		e = e || window.event;
		switch(e.which || e.keyCode) {
			case 39: // right
				if ( isPartial ) {
					slidePartialNext();
				} else {
					slideNext();
				}
				break;

			case 37: // left
				if ( isPartial ) {
					slidePartialPrev();
				} else {
					slidePrev();
				}
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
							slideDirection = "prev";

							sliderActive.find('.slide:last-child').prependTo(slideMovable);
							slideMovable.css({ 'margin-left': slideStep - sliderWidth });

							cloned = true;
						}
					} else {
						clone = true;

						if ( cloned ) {
							slideDirection = "prev";

							sliderActive.find('.slide:first-child').appendTo(slideMovable);
							slideMovable.css({ 'margin-left': slideStep });

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
							animDuration = 250;
							slideAction();

							setTimeout(function() {
								if ( cloned ) {
									slideDirection = "prev";

									sliderActive.find('.slide:first-child').appendTo(slideMovable);
									slideMovable.css({ 'margin-left': slideStep });

									cloned = false;
								}
							}, animDuration);
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
						animDuration = 250;
						slideAction();

						setTimeout(function() {
							if ( cloned ) {
								slideDirection = "prev";

								sliderActive.find('.slide:first-child').appendTo(slideMovable);
								slideMovable.css({ 'margin-left': slideStep });

								cloned = false;
							}
						}, animDuration);
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
			.find('.slide').css({ 'visibility': 'visible' });

		if ( config.application.debug ) console.log("Widget :: Sliders");
	}
}