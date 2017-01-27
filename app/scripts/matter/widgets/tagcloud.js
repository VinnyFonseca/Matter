// Tag Cloud

matter.tagcloud = {
	tags: [],

	init: function() {
		if ( $("[data-tagcloud]").length ) {
			var self = this;

			$("[data-tagcloud]").each(function(i) {
				var el = $(this);

				self.element = {
					cloud: $(".tagcloud[data-tag='tagcloud-" + i + "']"),
					hidden: $("input[data-tag='tagcloud-" + i + "']")
				}

				if ( !self.element.cloud.length ) {
					$('<ul class="tagcloud" data-tag="tagcloud-' + i + '"></ul>').insertAfter(el);
					self.element.cloud = $(".tagcloud[data-tag='tagcloud-" + i + "']");
				}
				if ( !self.element.hidden.length ) {
					$('<input type="hidden" class="tagcloud-result" data-tag="tagcloud-' + i + '">').insertAfter(el);
					self.element.hidden = $("input[data-tag='tagcloud-" + i + "']");
				}

				self.controls(el);
			});

			if ( matter.config.application.debug ) console.log("Search :: Tag Cloud");
		}
	},

	update: function(el) {
		var tag = this.element.cloud.children(".tag");

		this.tags = [];

		for ( var i = 0; i < tag.length; i++ ) {
			this.tags.push(tag.eq(i).data("tag"));
		}

		if ( tag.length > 0 ) {
			this.element.cloud.addClass("active");
		} else {
			this.element.cloud.removeClass("active");
		}

		this.element.hidden.val(this.tags);
		el.val("").focus();
	},

	controls: function(el) {
		var self = this;

		var tag = function(value) {
			var tagClose = '<img class="svg icon icon-close" src="' + matter.config.application.base + 'img/icons/icon-close.svg">';
			var tagEl = '<li class="tag" data-tag="' + value + '">' + value + tagClose + '</li>';

			if ( value !== "" && $.inArray(value, self.tags) < 0 ) {
        self.element.cloud.addClass("active").append(tagEl);
      }

			if ( $.inArray(value, self.tags) >= 0 ) {
        matter.notification.call("Failure", "This tag already exists.", "failure");
      }

			matter.svg.init();
			self.update(el);
		}

		var change = function(event) {
			var value = el.val();
			new tag(value);
		}

		el.on("keyup", function(event) {
			if ( event.keyCode === 9 || event.keyCode === 13 ) { // Tab or Enter
        event.preventDefault();
				change();
			}
		})
		.on("change", function() {
			change();
		});

		this.element.cloud.on("click", ".tag", function() {
			$(this).remove();
			self.update(el);
		});
	}
}