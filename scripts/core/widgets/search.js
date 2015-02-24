// Unified Search

function initSearch() {
	if ( $("[data-search]").length ) {
		$("[data-search]").each(function(i) {
			var el = $(this),
				url = el.data("search"),
				index = i,
				tagArray = [],
				tagCloud = '<ul class="tagcloud"></ul>',
				tagClose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">';

			el.append(tagCloud);
			var target = el.find("ul.tagcloud");

			function buildSearch(data) {
				function populateSelects(subject) {
					var tempArray = [];

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i];
						var property = object[subject];

						if ( property instanceof Array ) {
							for ( var k = 0; k < property.length; k++ )
								if ( $.inArray(property[k], tempArray) < 0 ) tempArray.push(property[k]);
						} else {
							if ( $.inArray(property, tempArray) < 0 ) tempArray.push(property);
						}
					}

					$("select[data-search-subject='" + subject + "']").append('<option class="placeholder">Select ' + subject.toLowerCase() + '...</option>');

					tempArray.sort();
					for ( var value in tempArray ) {
						$("select[data-search-subject='" + subject + "']").append('<option>' + tempArray[value] + '</option>');
					}
				}

				function updateTags(subject) {
					var tempArray = [];
					for ( var n = 0, tag = target.children(".tag[data-tag-subject='" + subject + "']"); n < tag.length; n++ ) {
						tempArray.push(tag.eq(n).data("tag"));
					}
					tagArray[subject] = tempArray;
					initSVGs();

					console.log(tagArray);
				}

				el.find("input[type='text']").on("keydown", function(event) {
					if ( event.keyCode === 9 || event.keyCode === 13 ) { // Tab or Enter
						var value = $(this).val();

						if ( value !== "" ) tagArray["search"] = value;

						console.log(tagArray);
						return false;
					}
				});

				el.find("select[data-search-subject]").each(function(i) {
					var subject = $(this).data("search-subject");
					populateSelects(subject);

					$(this).on("change", function() {
						var value = $(this).val(),
							tag = '<li class="tag valign-middle" data-tag-group="' + i + '" data-tag-subject="' + subject + '" data-tag="' + value + '">' + '<span>' + value + '</span>' + tagClose + '</li>';

						if ( value !== "" ) {
							if ( $.inArray(value, tagArray[subject]) < 0 ) {
								target.addClass("active").append(tag);
							} else {
								notify("This tag already exists.", "failure");
							}
						}

						updateTags(subject);

						return false;
					});
				});

				target.on("click", ".tag", function() {
					var subject = $(this).data("tag-subject");
					$(this).remove();
					target.children(".tag").length > 0 ? target.addClass("active") : target.removeClass("active");

					updateTags(subject);
				});

				initDropdowns();
			}


			// AJAX JSON Call

			dataRequest(url, "GET", buildSearch);
		});

		if (config.application.debug) console.log("Widget :: Unified Search");
	}
}