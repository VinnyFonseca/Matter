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
				span.css({'font-size': fontSize.toString() + 'px'});
				span.css({'font-size': (fontSize / 10).toString() + 'rem'});
			} while (span.width() > el.width() && fontSize > minFontSize);

			do {
				fontSize++;
				span.css({'font-size': fontSize.toString() + 'px'});
				span.css({'font-size': (fontSize / 10).toString() + 'rem'});
			} while (span.width() < el.width() && fontSize < maxFontSize);

			if ( !el.hasClass("resized") ) el.addClass("resized");
		})();
	}
}