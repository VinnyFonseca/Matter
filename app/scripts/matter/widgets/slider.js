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
			if ( matter.config.application.debug ) console.log(":: Slider Init: " + id);
		});
	}
}


// Init and Setup

matter.slider = function(id) {
	this.init(id);
}

matter.slider.prototype.init = function(id) {
	var self = this;

	this.id = id;
	this.element = {};
	this.element.slider = $('#' + this.id);

	this.has = {
		arrows: function() {
			if ( !!self.element.slider.attr("data-arrows") ) {
				return self.element.slider.data("arrows"); // .data() returns boolean
			} else {
				return matter.config.slider.arrows; // already a boolean
			}
		},
		nav: function() {
			if ( !!self.element.slider.attr("data-nav") ) {
				return self.element.slider.data("nav"); // .data() returns boolean
			} else {
				return matter.config.slider.nav; // already a boolean
			}
		},
		thumbnails: function() {
			if ( !!self.element.slider.attr("data-thumbnails") ) {
				return self.element.slider.data("thumbnails"); // .data() returns boolean
			} else {
				return matter.config.slider.thumbnails; // already a boolean
			}
		},
		multiple: function() {
			if ( !!self.element.slider.attr("data-display") ) {
				return self.element.slider.data("display"); // .data() returns integer
			} else {
				return matter.config.slider.display; // already an integer
			}
		},
		slideshow: function() {
			if ( !!self.element.slider.attr("data-slideshow") ) {
				return self.element.slider.data("slideshow"); // .data() returns boolean
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
			this.value = self.element.slide.eq(self.current).outerWidth(true);
		}
	};
	this.height = {
		value: 0,
		calculate: function() {
			this.value = 0;
			for (var i = 0; i < self.count; i++) {
				if ( self.element.slide.eq(i).outerHeight(true) > this.value ) {
					this.value = self.element.slide.eq(i).outerHeight(true);
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
		self.move(0);
	});
	this.move(0);

	this.speed = !!self.element.slider.attr("data-duration") ? self.element.slider.data("duration") : matter.config.slider.duration;
	this.duration = this.speed;
	this.kick = this.duration / 4;

	this.stopped = false;
	this.animating = false;
	this.interval = !!self.element.slider.attr("data-interval") ? self.element.slider.data("interval") : matter.config.slider.interval;

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
	var self = this;

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
				self.end();
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
	var self = this;

	this.duration = this.kick;

	setTimeout(function() {
		if ( self.cloned ) {
			self.direction = "prev";

			self.element.slider.find('.slide:first-child').appendTo(self.element.movable);
			self.element.movable.css({ 'margin-left': 0 });

			self.cloned = false;
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
	var self = this;

	if ( this.multi && this.has.slideshow() ) {
		this.start();

		if ( !matter.config.application.touch ) {
			this.element.container.on('mouseenter touchstart touchenter', function() {
				self.stop();
			});
			this.element.container.on('mouseleave touchend touchleave touchcancel', function() {
				self.start();
			});
		} else {
			this.element.movable.on('click', function() {
				self.stop();
			});

			$("html").on('click', function(event) {
				if ( !$(event.target).closest(this.element.container).length && self.element.movable.hasClass("stopped") ) {
					self.start();
				}
			});
		}
	}
}

matter.slider.prototype.start = function() {
	var self = this;

	this.element.movable.removeClass("stopped");
	this.timer = setInterval(function() {
		self.next();
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
	var self = this;

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
			self.clone = true;
		});
		this.element.slider.children('.slider-arrow-prev').on('click', function() {
			self.prev();
		});
		this.element.slider.children('.slider-arrow-next').on('click', function() {
			self.next();
		});

		if ( this.multi ) this.element.slider.addClass("arrows");
	}
}

matter.slider.prototype.bullets = function() {
	var self = this;

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
		if ( self.has.nav() ) {
			return self.element.slider.find('.slider-bullet');
		} else {
			return self.element.slider.find('.bullet');
		}
	}

	if ( !this.animating ) {
		this.element.bullet().removeClass('active');
		this.element.bullet().eq(this.current).addClass('active');
	}

	this.element.bullet().on('click', function() {
		self.clone = true;
		self.any($(this).index());
	});

	if ( this.multi ) this.element.slider.addClass("bullets");
}

matter.slider.prototype.keyboard = function() {
	var self = this;

	document.onkeydown = function(event) {
		if ( this.multi ) {
			event = event || window.event;

			switch(event.which || event.keyCode) {
				case 39: // right
					self.next();
					break;

				case 37: // left
					self.prev();
					break;

				default: return; // exit this handler for other keys
			}
		}
	}
}

matter.slider.prototype.drag = function() {
	if ( matter.config.application.touch ) {
		var self = this;
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
						up: self.touch.first.y - this.y,
						down: this.y - self.touch.first.y,
						left: self.touch.first.x - this.x,
						right: this.x - self.touch.first.x
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
					var container = matter.measure(self.element.container);

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
						this.distance().left >= self.step + this.tolerance ||
						this.distance().right >= self.step + this.tolerance
					);
				},
				end: function() {
					if ( this.active() ) {
						if ( this.distance().left > this.trigger ) {
							self.next();
						} else if ( this.distance().right > this.trigger ) {
							self.prev();
						} else {
							self.kickback();
						}
					}

					self.touch.down = false;
					self.touch.first.x = 0;
					self.touch.first.y = 0;
					this.x = 0;
					this.y = 0;
					this.distance();
				}
			}
		}

		this.element.container.on("mousedown touchstart", function(event) {
			// if ( !matter.config.application.touch ) event.preventDefault();

			if ( matter.config.application.debug ) console.log(event, event.touches);

			if ( !self.animating && self.multi ) {
				self.touch.first.x = event.pageX || event.originalEvent.touches[0].pageX;
				self.touch.first.y = event.pageY || event.originalEvent.touches[0].pageY;
				self.touch.drag.x = self.touch.first.x;
				self.touch.drag.y = self.touch.first.y;

				self.touch.down = true;
			}
		})
		.on("mousemove touchmove", function(event) {
			if ( !self.animating && self.touch.down ) {
				self.touch.drag.x = event.pageX || event.originalEvent.touches[0].pageX;
				self.touch.drag.y = event.pageY || event.originalEvent.touches[0].pageY;

				if ( self.touch.drag.active() ) {
					// if ( !matter.config.application.touch ) event.preventDefault();

					if ( self.touch.drag.x > self.touch.first.x ) {
						if ( !self.cloned ) {
							self.direction = "prev";
							self.element.slider.find('.slide:last-child').prependTo(self.element.movable);
							self.element.movable.css({ 'margin-left': - self.width.value });
							self.cloned = true;
						}
					}
					if ( self.touch.drag.x < self.touch.first.x ) {
						self.clone = true;

						if ( self.cloned ) {
							self.direction = "next";
							self.element.slider.find('.slide:first-child').appendTo(self.element.movable);
							self.element.movable.css({ 'margin-left': 0 });
							self.cloned = false;
						}
					}

					self.element.movable.css({
						'left': - self.touch.drag.distance().left
					});

					if ( self.touch.drag.limit() ) {
						self.duration = self.kick;
						self.touch.drag.end();
					}
				}
			}
		})
		.on("mouseup mouseleave touchend touchcancel", function(event) {
			// if ( !matter.config.application.touch ) event.preventDefault();

			self.touch.drag.end();
		});
	}
}
