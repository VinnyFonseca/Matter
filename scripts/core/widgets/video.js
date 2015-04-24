// Video

function initVideo() {
	var ytAPIVideoReady = false,
		ytAPIFrameReady = false;

	// Youtube

	function ytFramePlayers() {
		if ( $("iframe[src*='youtube']").length ) {
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
						widget =   '<div class="video-frame ' + name + '">\
										<div class="video-overlay"></div>\
										<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">\
										<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
										<div class="video-button">\
											<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">\
											<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">\
										</div>\
										<iframe id="' + name + '" src="' + el.attr("src") + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>\
									</div>';

					el.replaceWith(widget);

					initSVGs();

					ytFrameBuild(name);
				}
			});

			function ytFrameBuild(name) {
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
							if ( !config.application.touch ) currentPlayer.playVideo();
						} else {
							currentPlayer.pauseVideo();
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !config.application.touch ) currentPlayer.playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						wrapper.removeClass("playing");
					}
				}
			}
		}
	}


	function ytVideoPlayers() {
		if ( $(".video-frame[data-video-service='youtube']").length ) {
			$(".video-frame[data-video-service='youtube']").each(function(i) {
				var el = $(this),
					name = "ytVideoPlayer-" + i,
					videoID = el.data("video-id"),
					videoThumb = !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ? el.data("video-thumb") : "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
					widget =   '<div class="video-overlay"></div>\
								<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">\
								<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">\
									<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">\
								</div>\
								<div id="' + name + '"></div>';

				el.html("").addClass(name).append(widget);
				el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

				initSVGs();

				ytVideoBuild(name, videoID);
			});

			function ytVideoBuild(name, videoID) {
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
							if ( !config.application.touch ) currentPlayer.playVideo();
						} else {
							currentPlayer.pauseVideo();
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !config.application.touch ) currentPlayer.playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						wrapper.removeClass("playing");
					}
				}
			}
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
			$.getScript('https://www.youtube.com/iframe_api');
		}

		if ( ytAPIVideoReady ) {
			ytVideoPlayers();
		} else {
			window.onYouTubePlayerAPIReady = function() {
				ytAPIVideoReady = true;
				ytVideoPlayers();
			}
			$.getScript('https://www.youtube.com/player_api');
		}
	}




	// Vimeo

	function vimFramePlayers() {
		if ( $("iframe[src*='vimeo']").length ) {
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
										<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">\
										<div class="video-thumb">&nbsp;</div>\
										<div class="video-button">\
											<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">\
											<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">\
										</div>\
										<iframe id="' + name + '" src="//player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>\
									</div>';

					el.wrap(widget);

					initSVGs();

					if ( !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ) {
						var videoThumb = el.data("video-thumb");
						el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
						el.remove();
					} else {
						function build(data) {
							var videoThumb = data[0].thumbnail_large;
							el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
							el.remove();
						}

						dataRequest("//vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);
					}

					vimFrameBuild(name);
				}
			});

			function vimFrameBuild(name) {
				var currentPlayer = $("#" + name),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				currentPlayer
					.on("load", onPlayerReady)
					.on("pause finish", onPlayerStop);

				function onPlayerReady() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !config.application.touch ) currentPlayer.vimeo("play");
						} else {
							currentPlayer.vimeo("pause");
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !config.application.touch ) currentPlayer.vimeo("play");
					});
				}

				function onPlayerStop() {
					wrapper.removeClass("playing");
				}
			}
		}
	}


	function vimVideoPlayers() {
		if ( $(".video-frame[data-video-service='vimeo']").length ) {
			$(".video-frame[data-video-service='vimeo']").each(function(i) {
				var el = $(this),
					name = "vimVideoPlayer-" + i,
					videoID = el.data("video-id"),
					playerVars = {
						api: 1,
						player_id: name
					},
					widget =   '<div class="video-overlay"></div>\
								<img class="video-loader" src="' + config.application.root + 'img/loader.gif" alt="Video loader">\
								<div class="video-thumb">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="' + config.application.root + 'img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-play.png\'">\
									<img class="svg icon icon-pause" src="' + config.application.root + 'img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'' + config.application.root + 'img/icons/icon-pause.png\'">\
								</div>\
								<iframe id="' + name + '" src="//player.vimeo.com/video/' + videoID + "?" + serialize(playerVars) + '" frameborder="0" allowfullscreen></iframe>';

				el.html("").addClass(name).append(widget);

				initSVGs();

				if ( !!el.attr('data-video-thumb') && el.attr('data-video-thumb') !== "" ) {
					var videoThumb = el.data("video-thumb");
					el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
				} else {
					function build(data) {
						var videoThumb = data[0].thumbnail_large;
						el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
					}

					dataRequest("//vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);
				}

				vimVideoBuild(name);
			});

			function vimVideoBuild(name) {
				var currentPlayer = $("#" + name),
					wrapper = $("." + name),
					preview = wrapper.children(".video-thumb"),
					button = wrapper.children(".video-button");

				currentPlayer
					.on("load", onPlayerReady)
					.on("pause finish", onPlayerStop);

				function onPlayerReady() {
					wrapper.addClass("loaded");

					button.off().on("click", function() {
						if ( !wrapper.hasClass("playing") ) {
							wrapper.addClass("playing");
							if ( !config.application.touch ) currentPlayer.vimeo("play");
						} else {
							currentPlayer.vimeo("pause");
						}
					});

					preview.off().on("click", function() {
						wrapper.addClass("playing");
						if ( !config.application.touch ) currentPlayer.vimeo("play");
					});
				}

				function onPlayerStop() {
					wrapper.removeClass("playing");
				}
			}
		}
	}

	vimFramePlayers();
	vimVideoPlayers();

	if ( config.application.debug ) console.log("Widget :: Videos");
}