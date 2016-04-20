// Video

var initVideo = function() {
	var ytAPIVideoReady = false,
		ytAPIFrameReady = false;

	// Youtube

	var ytFramePlayers = function() {
		if ( $("iframe[src*='youtube']").length ) {
			var ytFrameBuild = function(name) {
				var currentPlayer = new YT.Player(name, {
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					}),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				function onPlayerReady() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !matter.config.application.touch ) currentPlayer.playVideo();
						} else {
							currentPlayer.pauseVideo();
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !matter.config.application.touch ) currentPlayer.playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						wrapper.removeClass("playing");
					}
				}
			}

			$("iframe[src*='youtube']").each(function(i) {
				if ( !$(this).parents(".video-frame").length ) {
					var el = $(this),
						name = "ytFramePlayer-" + i,
						videoSRC = el.attr("src").split("/"),
						videoID = videoSRC[videoSRC.length - 1].split("?")[0],
						videoThumb = !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ? el.data("video-thumb") : "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
						playerVars = {
							rel: 0,
							wmode:'transparent',
							modestbranding: 1,
							enablejsapi: 1,
							html5: 1,
							showinfo: 0,
							controls: 1,
							autohide: 1
						},
						widget = '<div class="video-frame ' + name + '">\
									<div class="video-overlay"></div>\
									<div class="loader video-loader"><div class="loader-inner">&nbsp;</div></div>\
									<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
									<div class="video-button">\
										<img class="svg icon icon-play" src="' + matter.config.application.base + 'img/icons/icon-play.svg">\
										<img class="svg icon icon-pause" src="' + matter.config.application.base + 'img/icons/icon-pause.svg">\
									</div>\
									<iframe id="' + name + '" src="' + el.attr("src") + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>\
								</div>';

					el.replaceWith(widget);

					matter.svg.init();

					ytFrameBuild(name);
				}
			});
		}
	}


	var ytVideoPlayers = function() {
		if ( $(".video-frame[data-video-service='youtube']").length ) {
			var ytVideoBuild = function(name, videoID) {
				var currentPlayer = new YT.Player(name, {
						videoId: videoID,
						width: '1280',
						height: '600',
						playerVars: {
							rel: 0,
							wmode:'transparent',
							modestbranding: 1,
							enablejsapi: 1,
							html5: 1,
							showinfo: 0,
							controls: 1,
							autohide: 1
						},
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					}),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				function onPlayerReady() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !matter.config.application.touch ) currentPlayer.playVideo();
						} else {
							currentPlayer.pauseVideo();
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !matter.config.application.touch ) currentPlayer.playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						wrapper.removeClass("playing");
					}
				}
			}

			$(".video-frame[data-video-service='youtube']").each(function(i) {
				var el = $(this),
					name = "ytVideoPlayer-" + i,
					videoID = el.data("video-id"),
					videoThumb = !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ? el.data("video-thumb") : "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
					widget =   '<div class="video-overlay"></div>\
								<div class="loader video-loader"><div class="loader-inner">&nbsp;</div></div>\
								<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="' + matter.config.application.base + 'img/icons/icon-play.svg">\
									<img class="svg icon icon-pause" src="' + matter.config.application.base + 'img/icons/icon-pause.svg">\
								</div>\
								<div id="' + name + '"></div>';

				el.html("").addClass(name).append(widget);
				el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

				matter.svg.init();

				ytVideoBuild(name, videoID);
			});
		}
	}

	if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
		if ( ytAPIFrameReady ) {
			ytFramePlayers();
		} else {
			window.onYouTubeIframeAPIReady = function() {
				ytAPIFrameReady = true;
				ytFramePlayers();
			}
			$.getScript('//www.youtube.com/iframe_api');
		}

		if ( ytAPIVideoReady ) {
			ytVideoPlayers();
		} else {
			window.onYouTubePlayerAPIReady = function() {
				ytAPIVideoReady = true;
				ytVideoPlayers();
			}
			$.getScript('//www.youtube.com/player_api');
		}
	}




	// Vimeo

	var vimFramePlayers = function() {
		if ( $("iframe[src*='vimeo']").length ) {
			var vimFrameBuild = function(name) {
				var currentPlayer = $("#" + name),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				var onPlayerReady = function() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !matter.config.application.touch ) currentPlayer.vimeo("play");
						} else {
							currentPlayer.vimeo("pause");
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !matter.config.application.touch ) currentPlayer.vimeo("play");
					});
				};

				var onPlayerStop = function() {
					wrapper.removeClass("playing");
				};

				currentPlayer
					.on("load", onPlayerReady)
					.on("pause finish", onPlayerStop);
			}

			$("iframe[src*='vimeo']").each(function(i) {
				if ( !$(this).parents(".video-frame").length ) {
					var el = $(this),
						name = "vimFramePlayer-" + i,
						videoSRC = el.attr("src").split("/"),
						videoID = videoSRC[videoSRC.length - 1].split("?")[0],
						playerVars = {
							api: 1,
							player_id: name
						},
						widget =   '<div class="video-frame ' + name + '">\
										<div class="video-overlay"></div>\
										<div class="loader video-loader"><div class="loader-inner">&nbsp;</div></div>\
										<div class="video-thumb">&nbsp;</div>\
										<div class="video-button">\
											<img class="svg icon icon-play" src="' + matter.config.application.base + 'img/icons/icon-play.svg">\
											<img class="svg icon icon-pause" src="' + matter.config.application.base + 'img/icons/icon-pause.svg">\
										</div>\
										<iframe id="' + name + '" src="//player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>\
									</div>';

					el.wrap(widget);

					matter.svg.init();

					if ( !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ) {
						var videoThumb = el.data("video-thumb");
						el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
						el.remove();
					} else {
						var build = function(data) {
							var videoThumb = data[0].thumbnail_large;
							el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
							el.remove();
						}

						matter.data.get("//vimeo.com/api/v2/video/" + videoID + ".json", build);
					}

					vimFrameBuild(name);
				}
			});
		}
	}


	var vimVideoPlayers = function() {
		if ( $(".video-frame[data-video-service='vimeo']").length ) {
			var vimVideoBuild = function(name) {
				var currentPlayer = $("#" + name),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				var onPlayerReady = function() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !matter.config.application.touch ) currentPlayer.vimeo("play");
						} else {
							currentPlayer.vimeo("pause");
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !matter.config.application.touch ) currentPlayer.vimeo("play");
					});
				};

				var onPlayerStop = function() {
					wrapper.removeClass("playing");
				};

				currentPlayer
					.on("load", onPlayerReady)
					.on("pause finish", onPlayerStop);
			}

			$(".video-frame[data-video-service='vimeo']").each(function(i) {
				var el = $(this),
					name = "vimVideoPlayer-" + i,
					videoID = el.data("video-id"),
					playerVars = {
						api: 1,
						player_id: name
					},
					widget =   '<div class="video-overlay"></div>\
								<div class="loader video-loader"><div class="loader-inner">&nbsp;</div></div>\
								<div class="video-thumb">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="' + matter.config.application.base + 'img/icons/icon-play.svg">\
									<img class="svg icon icon-pause" src="' + matter.config.application.base + 'img/icons/icon-pause.svg">\
								</div>\
								<iframe id="' + name + '" src="//player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>';

				el.html("").addClass(name).append(widget);

				matter.svg.init();

				if ( !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ) {
					var videoThumb = el.data("video-thumb");
					el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
				} else {
					var build = function(data) {
						var videoThumb = data[0].thumbnail_large;
						el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
					}

					matter.data.get("//vimeo.com/api/v2/video/" + videoID + ".json", build);
				}

				vimVideoBuild(name);
			});
		}
	}

	vimFramePlayers();
	vimVideoPlayers();

	debug.log(":: Videos");
}