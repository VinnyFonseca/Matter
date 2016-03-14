// Slider

matter.sliders = {
	init: function() {
		var slider = $("[data-slider='true']");

		$.each(slider, function(i) {
			var n = 0;
			var id;

			if ( !!$(this).attr("id") ) {
				id = $(this).attr("id");
			} else {
				id = "slider-" + i;
				$(this).attr("id", id);
				n++;
			}

			setTimeout(function() {
				new matter.slider(id);
			}, 250 * i);

			$(this).find('.slide').css({ 'visibility': 'visible' });
			if ( matter.config.application.debug ) console.log("Widget :: Slider Init: " + id);
		});
	}
}


// Init and Setup

matter.slider = function(id) {
	this.init(id);
}

matter.slider.prototype.init = function(id) {
	var $this = this;

	this.id = id;
	this.element = {};
	this.element.slider = $('#' + this.id);

	this.has = {
		arrows: function() {
			if ( !!$this.element.slider.attr("data-arrows") ) {
				return $this.element.slider.data("arrows"); // .data() returns boolean
			} else {
				return matter.config.slider.arrows; // already a boolean
			}
		},
		nav: function() {
			if ( !!$this.element.slider.attr("data-nav") ) {
				return $this.element.slider.data("nav"); // .data() returns boolean
			} else {
				return matter.config.slider.nav; // already a boolean
			}
		},
		thumbnails: function() {
			if ( !!$this.element.slider.attr("data-thumbnails") ) {
				return $this.element.slider.data("thumbnails"); // .data() returns boolean
			} else {
				return matter.config.slider.thumbnails; // already a boolean
			}
		},
		multiple: function() {
			if ( !!$this.element.slider.attr("data-display") ) {
				return $this.element.slider.data("display"); // .data() returns boolean
			} else {
				return matter.config.slider.display; // already a boolean
			}
		},
		slideshow: function() {
			if ( !!$this.element.slider.attr("data-slideshow") ) {
				return $this.element.slider.data("slideshow"); // .data() returns boolean
			} else {
				return matter.config.slider.slideshow; // already a boolean
			}
		}
	}

	var containerEl = '<div class="slider-container"></div>';
	this.element.slider.append(containerEl);
	this.element.container = this.element.slider.find('.slider-container');

	var movableEl = '<div class="slider-movable"></div>';
	this.element.container.append(movableEl);
	this.element.movable = this.element.slider.find('.slider-movable');

	this.element.slide = this.element.slider.find('.slide');
	this.element.slide.each(function() { $(this).attr("data-index", $(this).index()) }).appendTo(this.element.movable);

	this.count = this.element.slide.length;
	this.multi = this.count > this.has.multiple();
	this.min = 0;
	this.max = this.count  - 1;
	this.before = 0;
	this.current = 0;

	this.width = this.element.slide.eq(this.current).outerWidth(true);
	this.height = {
		value: 0,
		calculate: function() {
			for (var i = 0; i < $this.element.slide.length; i++) {
				if ( $this.element.slide.eq(i).outerHeight(true) > $this.height.value ) {
					$this.height.value = $this.element.slide.eq(i).outerHeight(true);
				}
			}
		}
	};
	this.height.calculate();

	this.direction = "none";

	this.clone = true;
	this.cloned = false;

	this.touch = {};
	this.controls();
	this.position();

	$(window).on("resize", function() {
		$this.move(0);
	});
	this.move(0);

	this.stopped = false;
	this.animating = false;
	this.duration = matter.config.slider.duration;
	this.interval = matter.config.slider.interval;

	this.slideshow();
}

matter.slider.prototype.position = function() {
	this.height.calculate();

	this.element.movable.css({
		'margin-left': 0,
		'left': 0,
		'height': this.height.value
	});

	this.touch.boundaries = {
		top: this.element.slider.offset().top + (this.touch.tolerance / 2),
		bottom: this.element.slider.offset().top + this.element.slider.height() - (this.touch.tolerance / 2),
		left: this.element.slider.offset().left + this.touch.tolerance,
		right: this.element.slider.offset().left + this.element.slider.width() - this.touch.tolerance
	}

	this.step = this.width;
	this.touch.trigger = this.width / 4;
}


// Actions

matter.slider.prototype.move = function(i) {
	var $this = this;

	this.width = this.element.slide.eq(this.current).outerWidth(true);
	this.height.value = this.element.slide.eq(this.current).outerHeight(true);

	this.animating = true;
	this.step = this.width * i;

	if ( this.direction == "prev" ) this.cloning();

	this.element.movable
		.stop(true, false)
		.animate({
			'left': - $this.step
		}, {
			duration: $this.duration,
			complete: function() {
				$this.end($this);
			}
		});

	this.element.bullet().removeClass('active');
	this.element.bullet().eq(this.current).addClass('active');
}

matter.slider.prototype.prev = function() {
	if ( !this.animating ) {
		this.direction = "prev";

		if ( this.current <= this.min ) {
			this.current = this.max;
		} else {
			this.current--;
		}

		this.move(-1);
		this.before = this.current;
	}
}

matter.slider.prototype.next = function() {
	if ( !this.animating ) {
		this.direction = "next";

		if ( this.current >= this.max ) {
			this.current = this.min;
		} else {
			this.current++;
		}


		this.move(1);
		this.before = this.current;
	}
}

matter.slider.prototype.any = function(i) {
	if ( !this.animating ) {
		this.current = i;

		if ( this.current < this.before ) this.direction = "prev";
		if ( this.current > this.before ) this.direction = "next";

		this.move(this.current - this.before);
		this.before = this.current;
	}
}

matter.slider.prototype.end = function() {
	this.clone = true;
	this.cloned = false;
	this.animating = false;
	this.duration = matter.config.slider.duration;

	if ( this.direction == "next" ) this.cloning();
	this.position();
}

matter.slider.prototype.kickback = function() {
	var $this = this;

	this.duration = 250;

	setTimeout(function() {
		if ( $this.cloned ) {
			$this.direction = "prev";

			$this.element.slider.find('.slide:first-child').appendTo($this.element.movable);
			$this.element.movable.css({ 'margin-left': 0 });

			$this.cloned = false;
		}
	}, this.duration);
}

matter.slider.prototype.cloning = function() {
	if ( this.clone && !this.cloned ) {
		if ( this.direction == "prev" ) {
			for ( var i = this.max; i >= this.current; i-- ) {
				this.element.movable.prepend(this.element.slide.eq(i));
			}
		}
		if ( this.direction == "next" ) {
			for ( var j = this.min; j <= this.current; j++ ) {
				this.element.movable.append(this.element.slide.eq(j - 1));
			}
		}

		this.element.movable.css({ 'margin-left': this.step });
		this.clone = false;
	}
}


// Slideshow

matter.slider.prototype.slideshow = function() {
	var $this = this;

	if ( this.multi && this.has.slideshow() ) {
		this.start();

		if ( !matter.config.application.touch ) {
			this.element.slider.on('mouseenter', function() {
				$this.stop();
			});
			this.element.slider.on('mouseleave', function() {
				$this.start();
			});
		} else {
			this.element.movable.on('click touchstart', function() {
				$this.stop();
			});

			$("html").on('click touchstart', function(event) {
				if ( !$(event.target).closest(".slider").length && $this.element.movable.hasClass("stopped") ) {
					$this.start();
				}
			});
		}
	}
}

matter.slider.prototype.start = function() {
	var $this = this;

	this.element.movable.removeClass("stopped");
	this.timer = setInterval(function() {
		$this.next();
	}, this.interval);
}

matter.slider.prototype.stop = function() {
	this.element.movable.addClass("stopped");
	clearInterval(this.timer);
}


// Controls

matter.slider.prototype.controls = function() {
	this.arrows();
	this.bullets();
	this.keyboard();
	this.drag();
}

matter.slider.prototype.arrows = function() {
	var $this = this;

	var prev = '<div class="slider-arrow slider-arrow-prev valign-middle">\
					<img class="svg icon icon-caret-left" src="' + matter.config.application.base + 'img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src=\'' + matter.config.application.base + 'img/icons/icon-caret-left.png\'">\
				</div>';
	var next = '<div class="slider-arrow slider-arrow-next valign-middle">\
					<img class="svg icon icon-caret-right" src="' + matter.config.application.base + 'img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src=\'' + matter.config.application.base + 'img/icons/icon-caret-right.png\'">\
				</div>';

	this.element.slider.prepend(prev);
	this.element.slider.prepend(next);
	matter.svg.init();

	this.element.slider.children('.slider-arrow-prev').on('click', function() {
		$this.clone = true;
		$this.prev();
	});
	this.element.slider.children('.slider-arrow-next').on('click', function() {
		$this.clone = true;
		$this.next();
	});

	if ( this.has.arrows() && this.multi ) {
		this.element.slider.addClass("arrows");
	}
}

matter.slider.prototype.bullets = function() {
	var $this = this;

	if ( this.multi ) {
		if ( this.has.nav() ) {
			var navEl = '<div class="slider-nav"></div>';
			this.element.slider.append(navEl);
		}

		for ( var i = 0; i < this.count; i++ ) {
			var slide = this.element.slide.eq(i);
			var img = slide.data("thumb");

			if ( slide.hasClass("thumb") ) slide.css({ "background-image": "url('" + img + "')" });

			if ( this.has.nav() ) {
				var bulletEl;

				if ( this.has.thumbnails() ) {
					bulletEl = '<div class="slider-bullet" style="background: url(\'' + img + '\') no-repeat center center;">&nbsp;</div>';

					this.element.slider.children('.slider-nav').addClass("thumbnails");
				} else {
					bulletEl = '<div class="slider-bullet">&bull;</div>';
				}

				this.element.slider.children('.slider-nav').append(bulletEl);
			}
		}

		this.element.bullet = function() {
			if ( $this.has.nav() ) {
				return $this.element.slider.find('.slider-bullet');
			} else {
				return $this.element.slider.find('.bullet');
			}
		}
		this.element.bullet().removeClass('active');
		this.element.bullet().eq(this.current).addClass('active');

		this.element.bullet().on('click', function() {
			$this.clone = true;
			$this.any($(this).index());
		});
	}
}

matter.slider.prototype.keyboard = function() {
	var $this = this;

	document.onkeydown = function(event) {
		event = event || window.event;

		switch(event.which || event.keyCode) {
			case 39: // right
				$this.next();
				break;

			case 37: // left
				$this.prev();
				break;

			default: return; // exit this handler for other keys
		}

		event.preventDefault();
	}
}

matter.slider.prototype.drag = function() {
	// if ( matter.config.application.touch ) {
		var $this = this;
		this.cloned = false;

		this.touch = {
			down: false,
			trigger: this.width / 4,
			drag: {
				start: false,
				active: false,
				up: 0,
				down: 0,
				left: 0,
				right: 0
			},
			threshold: matter.config.slider.threshold,
			tolerance: 50,
			first: {
				x: 0,
				y: 0
			},
			current: {
				x: 0,
				y: 0
			},
			last: {
				x: 0,
				y: 0
			}
		}
		this.touch.boundaries = {
			top: this.element.slider.offset().top + (this.touch.tolerance / 2),
			bottom: this.element.slider.offset().top + this.element.slider.height() - (this.touch.tolerance / 2),
			left: this.element.slider.offset().left + this.touch.tolerance,
			right: this.element.slider.offset().left + this.element.slider.width() - this.touch.tolerance
		}
		this.touch.end = function() {
			if ( $this.touch.down ) {
				$this.touch.down = false;
				$this.touch.drag.active = false;

				if ( $this.touch.drag.left > $this.touch.trigger ) {
					$this.next();
				} else if ( $this.touch.drag.right > $this.touch.trigger ) {
					$this.prev();
				} else {
					$this.kickback();
					$this.move(0);
				}

				$this.touch.first.x = 0;
				$this.touch.first.y = 0;
				$this.touch.last.x = $this.touch.current.x;
				$this.touch.last.y = $this.touch.current.y;
				$this.touch.current.x = 0;
				$this.touch.current.y = 0;
			}
		}


		this.element.slide.on("mousedown touchstart", function(event) {
			if ( !matter.config.application.touch ) event.preventDefault();

			$this.touch.first.x = event.pageX || event.touches[0].pageX;
			$this.touch.first.y = event.pageY || event.touches[0].pageY;
			$this.touch.current.x = event.pageX || event.touches[0].pageX;
			$this.touch.current.y = event.pageY || event.touches[0].pageY;

			if ( $this.multi ) $this.touch.down = true;
		})
		.on("mousemove touchmove", function(event) {
			$this.touch.current.x = event.pageX || event.touches[0].pageX;
			$this.touch.current.y = event.pageY || event.touches[0].pageY;

			$this.touch.drag = {
				up: $this.touch.first.y - $this.touch.current.y,
				down: $this.touch.current.y - $this.touch.first.y,
				left: $this.touch.first.x - $this.touch.current.x,
				right: $this.touch.current.x - $this.touch.first.x
			};

			$this.touch.drag.start = (
				// $this.touch.drag.up > $this.touch.threshold ||
				// $this.touch.drag.down > $this.touch.threshold ||
				$this.touch.drag.left > $this.touch.threshold ||
				$this.touch.drag.right > $this.touch.threshold
			);

			if ( !$this.animating && $this.touch.down && $this.touch.drag.start ) {
				if ( !matter.config.application.touch ) event.preventDefault();
				$this.touch.drag.active = true;

				if ( $this.touch.current.x > $this.touch.first.x ) {
					if ( !$this.cloned ) {
						$this.direction = "prev";
						$this.element.slider.find('.slide:last-child').prependTo($this.element.movable);
						$this.element.movable.css({ 'margin-left': - $this.width });
						$this.cloned = true;
					}
				}
				if ( $this.touch.current.x < $this.touch.first.x ) {
					$this.clone = true;

					if ( $this.cloned ) {
						$this.direction = "next";
						$this.element.slider.find('.slide:first-child').appendTo($this.element.movable);
						$this.element.movable.css({ 'margin-left': 0 });
						$this.cloned = false;
					}
				}

				$this.element.movable.css({
					'left': - ($this.touch.first.x - $this.touch.current.x)
				});

				$this.touch.drag.limit = (
					$this.touch.current.y <= $this.touch.boundaries.top ||
					$this.touch.current.y >= $this.touch.boundaries.bottom ||
					$this.touch.current.x <= $this.touch.boundaries.left ||
					$this.touch.current.x >= $this.touch.boundaries.right ||
					$this.touch.drag.left >= $this.step + $this.touch.tolerance ||
					$this.touch.drag.right >= $this.step + $this.touch.tolerance
				);

				if ( $this.touch.drag.limit ) {
					$this.duration = $this.duration / 4;
					$this.touch.end();
				}
			}
		})
		.on("mouseup mouseleave touchend touchcancel", function(event) {
			if ( !matter.config.application.touch ) event.preventDefault();

			$this.touch.end();
		});
	// }
}
