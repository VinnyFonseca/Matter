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

			dataRequest(url, "GET", build);

			function build(data) {
				function intersectArrays(array1, array2) {
					var base;

					if (array2.length > array1.length) { // indexOf to loop over shorter
						base = array2, array2 = array1, array1 = base;
					}

					return array1.filter(function(e) {
						if (array2.indexOf(e) !== -1) return true;
					});
				}

				function updateResults() {
					var tagArray = [],
						tagArray = [],
						finalArray = [];

					results.html("");

					input.each(function() {
						var subject = $(this).data("search-subject"),
							criteria = subject.replace(/\s/g, "").split(",");

						for ( var i = 0; i < criteria.length; i++ ) {
							var tempArray = [];
							tagArray[criteria[i]] = [];

							for ( var j = 0; j < data.Items.length; j++ ) {
								var object = data.Items[j],
									id = object.Id;
									compare = searchArray[criteria[i]],
									analyse = object[criteria[i]];

								if ( analyse instanceof Array ) {
									if ( intersectArrays(analyse, compare).length && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								} else {
									if ( analyse.indexOf(compare) > -1 && $.inArray(id, tempArray) < 0 ) {
										tempArray.push(id);
									}
								}
							}

							tagArray[criteria[i]] = tempArray;
						}
					});

					tagcloud.children(".tag[data-tag-subject]").each(function() {
						var subject = $(this).data("tag-subject"),
							criteria = subject,
							compare = searchArray[subject];

						var tempArray = [];
						tagArray[subject] = [];

						for ( var i = 0; i < data.Items.length; i++ ) {
							var object = data.Items[i],
								id = object.Id,
								analyse = object[criteria];

							if ( analyse instanceof Array ) {
								if ( intersectArrays(analyse, compare).length && $.inArray(id, tempArray) < 0 ) {
									tempArray.push(id);
								}
							} else {
								if ( $.inArray(analyse, compare) > -1 && $.inArray(id, tempArray) < 0 ) {
									tempArray.push(id);
								}
							}
						}

						tagArray[subject] = tempArray;
					});



					// Intersect, Unique, Final values

					var prevArray = [];

					for ( var i = 0; i < subjectArray.length; i++ ) {
						// finalArray = prevArray.concat(tagArray[subjectArray[i]]);
						// finalArray = intersectArrays(tagArray[subjectArray[i]], prevArray);
						// console.log(prevArray, tagArray[subjectArray[i]);

						prevArray = tagArray[subjectArray[i]];
					}


					console.log(searchArray, tagArray, finalArray);

					for ( var i = 0; i < data.Items.length; i++ ) {
						var object = data.Items[i],
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

						for ( var j = 0; j < finalArray.length; j++ ) {
							if ( id == finalArray[j] ) results.append(item);
						}
					}

					results.children(".search-item").length ? results.show() : results.hide();
				}

				function populateSelects(subject) {
					var target = el.find("select[data-search-subject='" + subject + "']");

					var tempArray = [];
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
					var target = tagcloud.children(".tag[data-tag-subject='" + subject + "']");

					var tempArray = [];
					searchArray[subject] = [];

					for ( var n = 0; n < target.length; n++ ) {
						var value = target.eq(n).data("tag");
						tempArray.push(value);
					}

					searchArray[subject] = tempArray;

					initSVGs();
				}



				// Interactive Behaviour

				var subjectArray = [];

				input.each(function() {
					var subject = $(this).data("search-subject").replace(/\s/g, "").split(",");

					for ( var i = 0; i < subject.length; i++ ) {
						if ( $.inArray(subject[i], subjectArray) < 0 ) subjectArray.push(subject[i]);
					}

					$(this).on("keydown", function(event) {
						if ( event.keyCode === 13 ) { // Enter
							var value = $(this).val();
								subject = $(this).data("search-subject");
								criteria = subject.replace(/\s/g, "").split(",");

							for ( var i = 0; i < criteria.length; i++ ) {
								searchArray[criteria[i]] = value;
							}

							updateResults();
							return false;
						}
					});
				});

				select.each(function(i) {
					var placeholder = $(this).val(),
						subject = $(this).data("search-subject");

					populateSelects(subject);

					if ( $.inArray(subject, subjectArray) < 0 ) subjectArray.push(subject);

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