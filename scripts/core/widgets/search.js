// Unified Search

function initSearch() {
	if ( $("[data-search]").length ) {
		$("[data-search]").each(function(i) {
			var el = $(this),
				url = el.data("search"),
				index = i,
				input = el.find("input[data-search-subject]");
				select = el.find("select[data-search-subject]");
				searchArray = [],
				tagcloudElement = '<ul class="tagcloud"></ul>',
				tagclose = '<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">',
				resultsElement = '<div class="search-results valign-middle"></div>';

			el.append(tagcloudElement).append(resultsElement);
			var tagcloud = el.find("ul.tagcloud");
			var results = el.find(".search-results");

			searchArray["Search"] = "";

			dataRequest(url, "GET", build);

			function build(data) {
				function populateSelects(subject) {
					var tempArray = [],
						target = el.find("select[data-search-subject='" + subject + "']");

					searchArray[subject] = [];

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
					tempArray.sort();

					var placeholder = '<option class="placeholder">Select ' + subject + '...</option>';
					target.append(placeholder);

					for ( var value in tempArray ) {
						var option = '<option value="' + tempArray[value] + '">' + tempArray[value] + '</option>';
						target.append(option);
					}
				}

				function updateTags(subject) {
					var tempArray = [],
						target = tagcloud.children(".tag[data-tag-subject='" + subject + "']");

					for ( var n = 0; n < target.length; n++ ) {
						var value = target.eq(n).data("tag");
						tempArray.push(value);
					}
					searchArray[subject] = tempArray;

					initSVGs();
				}

				function updateResults() {
					var tempArray = [];

					// results.html("");

					// input.each(function() {
					// 	var subject = $(this).data("search-subject"),
					// 		compare = searchArray[subject],
					// 		analyse = ["Title", "Summary"];

					// 	for ( var i = 0; i < analyse.length; i++ ) {
					// 		tempArray[analyse[i]] = "";

					// 		for ( var n = 0; n < data.Items.length; n++ ) {
					// 			var object = data.Items[n],
					// 				id = object.Id;

					// 			if ( compare !== "" && object[analyse[i]].indexOf(compare) > -1 ) {
					// 				if ( $.inArray(id, tempArray) < 0 ) tempArray[analyse[i]] = object[analyse[i]];
					// 			}
					// 		}
					// 	}
					// });

					// select.each(function() {
					// 	var subject = $(this).data("search-subject");
					// 	tempArray[subject] = [];
					// });

					// tagcloud.children(".tag[data-tag-subject]").each(function() {
					// 	var subject = $(this).data("tag-subject");
					// 		compare = searchArray[subject];

					// 	tempArray[subject] = [];

					// 	for ( var i = 0; i < compare.length; i++ ) {
					// 		for ( var n = 0; n < data.Items.length; n++ ) {
					// 			var object = data.Items[n],
					// 				id = object.Id;

					// 			console.log(object[subject], searchArray[subject]);

					// 			if ( object[subject] === searchArray[subject] ) {
					// 				tempArray[subject].push(object[subject]);
					// 			}
					// 		}
					// 	}
					// });

					// getArrayDuplicates(tempArray);

					// console.log(searchArray, tempArray);

					// for ( var i = 0; i < tempArray.length; i++ ) {
						for ( var n = 0; n < data.Items.length; n++ ) {
							var object = data.Items[n],
								id = object.Id,
								image = object.Image,
								title = object.Title,
								date = new Date(object.Date),
								hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
								minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
								day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
								month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
								year = date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear();
								fulldate = hour + ":" + minute + " @ " + day + "/" + month + "/" + year;
								url = object.Url,
								summary = object.Summary,
								type = object.Type,
								categories = object.Categories
								tags = object.Tags;
								item =  '<div class="search-item">\
											 <a href="' + url + '">\
												 <img src="' + image + '" />\
												 <div class="title">' + title + '</div>\
											 </a>\
											 <div class="date">' + fulldate + '</div>\
											 <div class="summary">' + summary + '</div>\
											 <div class="type">Type: ' + type + '</div>\
											 <div class="categories">Categories: ' + categories + '</div>\
											 <div class="tags">Tags: ' + tags + '</div>\
										</div>';

							results.append(item);
						}
					// }

					results.children(".search-item").length ? results.show() : results.hide();
				}

				input.on("keydown", function(event) {
					if ( event.keyCode === 13 ) { // Enter
						var value = $(this).val();
							subject = $(this).data("search-subject");

						if ( value !== "" ) searchArray[subject] = value;

						updateResults();
						return false;
					}
				});

				select.each(function(i) {
					var placeholder = $(this).val(),
						subject = $(this).data("search-subject");

					$(this).parents(".dropdown-wrapper").attr("data-search-subject", subject);

					populateSelects(subject);

					$(this).on("change", function(event) {
						event.preventDefault();

						var value = $(this).val(),
							tag = '<li class="tag valign-middle" data-tag-group="' + i + '" data-tag-subject="' + subject + '" data-tag="' + value + '">' + '<span>' + value + '</span>' + tagclose + '</li>';

						if ( value !== "" ) {
							if ( $.inArray(value, searchArray[subject]) < 0 ) {
								tagcloud.addClass("active").append(tag);
							} else {
								notify("This tag already exists.", "failure");
							}
						}

						updateTags(subject);
						updateResults();
					});
				});

				tagcloud.on("click", ".tag", function() {
					var subject = $(this).data("tag-subject");
					$(this).remove();
					tagcloud.children(".tag").length > 0 ? tagcloud.addClass("active") : tagcloud.removeClass("active");

					updateTags(subject);
					updateResults();
				});

				initDropdowns();
				updateResults();
			}
		});

		if (config.application.debug) console.log("Search :: Unified Search");
	}
}