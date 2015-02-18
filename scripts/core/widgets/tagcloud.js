// Tooltips

function initTagClouds() {
	$("[data-tagcloud]").each(function(i) {
		var el = $(this),
			index = i,
			tagArray = [],
			tagCloud = '<ul class="tagcloud" data-tag="tagcloud-' + index + '"></ul>',
			tagHidden = '<input type="hidden" class="tagcloud-result" data-tag="tagcloud-' + index + '">';

		$(tagHidden).insertAfter(el);
		$(tagCloud).insertAfter(el);

		var target = $(".tagcloud[data-tag='tagcloud-" + index + "']"),
			hidden = $("input[data-tag='tagcloud-" + index + "']");

		el.on("keydown", function(event) {
			if ( event.keyCode === 9 || event.keyCode === 13 ) { // Tab or Enter
				var value = el.val(),
					tag = '<li class="tag" data-tag="' + value + '">' + value + '<span>✖</span></li>';

				if ( value !== "" && $.inArray(value, tagArray) < 0 ) target.addClass("active").append(tag);
				if ( $.inArray(value, tagArray) >= 0 ) notify("This tag already exists.", "failure");

				tagArray = [];
				for ( var i = 0; i < target.children(".tag").length; i++ ) tagArray.push(target.children(".tag").eq(i).data("tag"));
				hidden.val(tagArray);

				el.val("").focus();

				target.on("click", ".tag", function() {
					$(this).remove();
					target.children(".tag").length > 0 ? target.addClass("active") : target.removeClass("active");
				});

				return false;
			}
		})
		.on("change", function() {
			var value = el.val(),
				tag = '<li class="tag" data-tag="' + value + '">' + value + '<span>✖</span></li>';

			console.log(value);

			if ( value !== "" && $.inArray(value, tagArray) < 0 ) target.addClass("active").append(tag);
			if ( $.inArray(value, tagArray) >= 0 ) notify("This tag already exists.", "failure");

			tagArray = [];
			for ( var i = 0; i < target.children(".tag").length; i++ ) tagArray.push(target.children(".tag").eq(i).data("tag"));
			hidden.val(tagArray);

			target.on("click", ".tag", function() {
				$(this).remove();
				target.children(".tag").length > 0 ? target.addClass("active") : target.removeClass("active");
			});

			return false;
		});
	});

	if (config.application.debug) console.log("Init :: Tag Clouds");
}