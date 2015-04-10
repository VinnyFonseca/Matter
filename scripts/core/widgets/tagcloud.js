// Tag Cloud

function initTagClouds() {
	if ( $("[data-tagcloud]").length ) {
		$("[data-tagcloud]").each(function(i) {
			var el = $(this),
				index = i,
				tagArray = [],
				tagCloud = '<ul class="tagcloud" data-tag="tagcloud-' + index + '"></ul>',
				tagHidden = '<input type="hidden" class="tagcloud-result" data-tag="tagcloud-' + index + '">',
				tagClose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">';

			$(tagHidden).insertAfter(el);
			$(tagCloud).insertAfter(el);

			var target = $(".tagcloud[data-tag='tagcloud-" + index + "']"),
				hidden = $("input[data-tag='tagcloud-" + index + "']");

			function updateArray() {
				tagArray = [];
				for ( var i = 0; i < target.children(".tag").length; i++ ) tagArray.push(target.children(".tag").eq(i).data("tag"));
				hidden.val(tagArray);
				initSVGs();
			}

			el.on("keydown", function(event) {
				if ( event.keyCode === 9 || event.keyCode === 13 ) { // Tab or Enter
					var value = el.val(),
						tag = '<li class="tag" data-tag="' + value + '">' + value + tagClose + '</li>';

					if ( value !== "" && $.inArray(value, tagArray) < 0 ) target.addClass("active").append(tag);
					if ( $.inArray(value, tagArray) >= 0 ) notify("This tag already exists.", "failure");

					updateArray();
					el.val("").focus();

					return false;
				}
			})
			.on("change", function() {
				var value = el.val(),
					tag = '<li class="tag" data-tag="' + value + '">' + value + tagClose + '</li>';

				if ( value !== "" && $.inArray(value, tagArray) < 0 ) target.addClass("active").append(tag);
				if ( $.inArray(value, tagArray) >= 0 ) notify("This tag already exists.", "failure");

				updateArray();

				return false;
			});

			target.on("click", ".tag", function() {
				$(this).remove();

				if ( target.children(".tag").length > 0 ) {
					target.addClass("active");
				} else {
					target.removeClass("active");
				}

				updateArray();
			});
		});

		if ( config.application.debug ) console.log("Search :: Tag Cloud");
	}
}