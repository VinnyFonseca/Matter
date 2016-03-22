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
				return $this.element.slider.data("display"); // .data() returns integer
			} else {
				return matter.config.slider.display; // already an integer
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

	this.min = 0;
	this.max = this.count  - 1;
	this.before = 0;
	this.current = 0;

	this.width = {
		value: 0,
		calculate: function() {
			this.value = $this.element.slide.eq($this.current).outerWidth(true);
		}
	};
	this.height = {
		value: 0,
		calculate: function() {
			this.value = 0;
			for (var i = 0; i < $this.count; i++) {
				if ( $this.element.slide.eq(i).outerHeight(true) > this.value ) {
					this.value = $this.element.slide.eq(i).outerHeight(true);
				}
			}
		}
	};
	this.width.calculate();
	this.height.calculate();

	this.direction = "none";
	this.multi = this.width.value * this.count > this.element.slider.width() + 10;

	this.clone = true;
	this.cloned = false;

	this.touch = {};
	this.controls();
	this.position();

	$(window).on("resize", function() {
		$this.move(0);
	});
	this.move(0);

	this.speed = !!$this.element.slider.attr("data-duration") ? $this.element.slider.data("duration") : matter.config.slider.duration;
	this.duration = this.speed;
	this.kick = this.duration / 4;

	this.stopped = false;
	this.animating = false;
	this.interval = !!$this.element.slider.attr("data-interval") ? $this.element.slider.data("interval") : matter.config.slider.interval;

	this.slideshow();
}

matter.slider.prototype.position = function() {
	this.element.movable.css({
		'margin-left': 0,
		'left': 0
	});

	this.width.calculate();
	this.step = this.width.value;
	this.touch.trigger = this.width.value / 4;
}


// Actions

matter.slider.prototype.move = function(i) {
	var $this = this;

	this.animating = true;
	this.width.calculate();
	this.step = this.width.value * i;

	if ( this.direction == "prev" ) this.cloning();

	this.height.calculate();
	this.element.slider.children('.slider-arrow').height(this.height.value);
	this.element.movable
		.stop(true, false)
		.animate({
			'left': - this.step,
			'height': this.height.value
		}, {
			duration: this.duration,
			complete: function() {
				$this.end();
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
	this.duration = this.speed;

	if ( this.direction == "next" ) this.cloning();
	this.position();
}

matter.slider.prototype.kickback = function() {
	var $this = this;

	this.duration = this.kick;

	setTimeout(function() {
		if ( $this.cloned ) {
			$this.direction = "prev";

			$this.element.slider.find('.slide:first-child').appendTo($this.element.movable);
			$this.element.movable.css({ 'margin-left': 0 });

			$this.cloned = false;
		}
	}, this.duration);

	this.move(0);
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
			this.element.container.on('mouseenter touchstart touchenter', function() {
				$this.stop();
			});
			this.element.container.on('mouseleave touchend touchleave touchcancel', function() {
				$this.start();
			});
		} else {
			this.element.movable.on('click', function() {
				$this.stop();
			});

			$("html").on('click', function(event) {
				if ( !$(event.target).closest(this.element.container).length && $this.element.movable.hasClass("stopped") ) {
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
	// this.keyboard();
	this.drag();
}

matter.slider.prototype.arrows = function() {
	var $this = this;

	if ( this.has.arrows() ) {
		var prev = '<div class="slider-arrow slider-arrow-prev valign-middle">\
						<img class="svg icon icon-caret-left" src="' + matter.config.application.base + 'img/icons/icon-caret-left.svg">\
					</div>';
		var next = '<div class="slider-arrow slider-arrow-next valign-middle">\
						<img class="svg icon icon-caret-right" src="' + matter.config.application.base + 'img/icons/icon-caret-right.svg">\
					</div>';

		this.element.slider.prepend(prev);
		this.element.slider.prepend(next);
		matter.svg.init();

		this.element.slider.children('.slider-arrow').height(this.height.value).on('click', function() {
			$this.clone = true;
		});
		this.element.slider.children('.slider-arrow-prev').on('click', function() {
			$this.prev();
		});
		this.element.slider.children('.slider-arrow-next').on('click', function() {
			$this.next();
		});

		if ( this.multi ) this.element.slider.addClass("arrows");
	}
}

matter.slider.prototype.bullets = function() {
	var $this = this;

	if ( this.has.nav() ) {
		var navEl = '<div class="slider-nav"></div>';
		this.element.slider.append(navEl);
	}

	for ( var i = 0; i < this.count; i++ ) {
		var slide = this.element.slide.eq(i);
		var thumb = slide.data("thumb");

		if ( this.has.thumbnails() ) slide.css({ "background-image": "url('" + thumb + "')" });

		if ( this.has.nav() ) {
			var bulletEl;

			if ( this.has.thumbnails() ) {
				bulletEl = '<div class="slider-bullet" style="background: url(\'' + thumb + '\') no-repeat center center;">&nbsp;</div>';

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

	if ( !this.animating ) {
		this.element.bullet().removeClass('active');
		this.element.bullet().eq(this.current).addClass('active');
	}

	this.element.bullet().on('click', function() {
		$this.clone = true;
		$this.any($(this).index());
	});

	if ( this.multi ) this.element.slider.addClass("bullets");
}

matter.slider.prototype.keyboard = function() {
	var $this = this;

	document.onkeydown = function(event) {
		if ( this.multi ) {
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
		}
	}
}

matter.slider.prototype.drag = function() {
	// if ( matter.config.application.touch ) {
		var $this = this;
		this.cloned = false;

		this.touch = {
			down: false,
			first: {
				x: 0,
				y: 0
			},
			drag: {
				x: 0,
				y: 0,
				threshold: matter.config.slider.threshold,
				tolerance: this.width.value / 20,
				trigger: this.width.value / 4,
				distance: function() {
					return {
						up: $this.touch.first.y - this.y,
						down: this.y - $this.touch.first.y,
						left: $this.touch.first.x - this.x,
						right: this.x - $this.touch.first.x
					}
				},
				active: function() {
					return (
						this.distance().up > this.threshold ||
						this.distance().down > this.threshold ||
						this.distance().left > this.threshold ||
						this.distance().right > this.threshold
					);
				},
				boundaries: function() {
					var container = matter.measure($this.element.container);

					return {
						top: container.top + this.tolerance,
						bottom: container.bottom - this.tolerance,
						left: container.left + this.tolerance,
						right: container.right - this.tolerance
					}
				},
				limit: function() {
					return (
						this.y <= this.boundaries().top ||
						this.y >= this.boundaries().bottom ||
						this.x <= this.boundaries().left ||
						this.x >= this.boundaries().right ||
						this.distance().left >= $this.step + this.tolerance ||
						this.distance().right >= $this.step + this.tolerance
					);
				},
				end: function() {
					if ( this.active() ) {
						if ( this.distance().left > this.trigger ) {
							$this.next();
						} else if ( this.distance().right > this.trigger ) {
							$this.prev();
						} else {
							$this.kickback();
						}
					}

					$this.touch.down = false;
					$this.touch.first.x = 0;
					$this.touch.first.y = 0;
					this.x = 0;
					this.y = 0;
					this.distance();
				}
			}
		}

		this.element.container.on("mousedown touchstart", function(event) {
			// if ( !matter.config.application.touch ) event.preventDefault();

			console.log(event, event.touches);

			if ( !$this.animating && $this.multi ) {
				$this.touch.first.x = event.pageX || event.originalEvent.touches[0].pageX;
				$this.touch.first.y = event.pageY || event.originalEvent.touches[0].pageY;
				$this.touch.drag.x = $this.touch.first.x;
				$this.touch.drag.y = $this.touch.first.y;

				$this.touch.down = true;
			}
		})
		.on("mousemove touchmove", function(event) {
			if ( !$this.animating && $this.touch.down ) {
				$this.touch.drag.x = event.pageX || event.originalEvent.touches[0].pageX;
				$this.touch.drag.y = event.pageY || event.originalEvent.touches[0].pageY;

				if ( $this.touch.drag.active() ) {
					// if ( !matter.config.application.touch ) event.preventDefault();

					if ( $this.touch.drag.x > $this.touch.first.x ) {
						if ( !$this.cloned ) {
							$this.direction = "prev";
							$this.element.slider.find('.slide:last-child').prependTo($this.element.movable);
							$this.element.movable.css({ 'margin-left': - $this.width.value });
							$this.cloned = true;
						}
					}
					if ( $this.touch.drag.x < $this.touch.first.x ) {
						$this.clone = true;

						if ( $this.cloned ) {
							$this.direction = "next";
							$this.element.slider.find('.slide:first-child').appendTo($this.element.movable);
							$this.element.movable.css({ 'margin-left': 0 });
							$this.cloned = false;
						}
					}

					$this.element.movable.css({
						'left': - $this.touch.drag.distance().left
					});

					if ( $this.touch.drag.limit() ) {
						$this.duration = $this.kick;
						$this.touch.drag.end();
					}
				}
			}
		})
		.on("mouseup mouseleave touchend touchcancel", function(event) {
			// if ( !matter.config.application.touch ) event.preventDefault();

			$this.touch.drag.end();
		});
	// }
}
