// Video

function initVideo() {
	var ytAPIVideoReady = false,
		ytAPIFrameReady = false,
		videoDone = false,
		ytVideos = [],
		ytFrames = [],
		vimVideos = [],
		vimFrames = [];

	// Youtube

	if ( $("iframe[src*='youtube']").length ) {
		$("iframe[src*='youtube']").each(function(i) {
			var el = $(this),
				id = "ytFramePlayer-" + i,
				videoSRC = el.attr("src").split("/"),
				videoID = videoSRC[videoSRC.length - 1].split("?")[0],
				videoThumb = "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
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
				widget =   '<div class="video-frame ' + id + '">\
								<div class="video-overlay"></div>\
								<img class="video-loader" src="img/loader.gif" alt="Video loader">\
								<div class="video-thumb">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
									<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
								</div>\
							</div>';

			if ( !el.parents(".video-frame").length ) {
				el.attr("id", id)
				  .attr("src", el.attr("src") + "?" + serialise(playerVars))
				  .wrap(widget);
			}
			el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

			initSVGs();

			ytFrames[i] = {
				elID: id
			};
		});

		function ytFramePlayers() {
			if (typeof ytFrames === 'undefined') return;

			for (var i = 0; i < ytFrames.length; i++) {
				var currentPlayer = new YT.Player(ytFrames[i].elID, {
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					}),
					wrapper = $("." + ytFrames[i].elID),
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
					if ( event.data == YT.PlayerState.PLAYING ) if ( !videoDone ) videoDone = true;
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						parent.removeClass("playing");
					}
				}
			}
		}
	}


	if ( $(".video-frame[data-video-service='youtube']").length ) {
		$(".video-frame[data-video-service='youtube']").each(function(i) {
			var el = $(this),
				id = "ytVideoPlayer-" + i,
				videoID = el.data("video-id"),
				videoThumb = "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
				widget =   '<div class="video-overlay"></div>\
							<img class="video-loader" src="img/loader.gif" alt="Video loader">\
							<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
							<div id="' + id + '"></div>';

			el.html("").addClass(id).append(widget);
			el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

			initSVGs();

			ytVideos[i] = {
				elID: id,
				width: '1280',
				height: '600',
				videoId: videoID
			};
		});

		function ytVideoPlayers() {
			if (typeof ytVideos === 'undefined') return;

			for (var i = 0; i < ytVideos.length; i++) {
				var currentPlayer = new YT.Player(ytVideos[i].elID, {
						videoId: ytVideos[i].videoId,
						width: ytVideos[i].width,
						height: ytVideos[i].height,
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
					wrapper = $("." + ytVideos[i].elID),
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
					if ( event.data == YT.PlayerState.PLAYING ) if ( !videoDone ) videoDone = true;
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

	if ( $("iframe[src*='vimeo']").length ) {
		$("iframe[src*='vimeo']").each(function(i) {
			var el = $(this),
				id = "vimFramePlayer-" + i,
				videoSRC = el.attr("src").split("/"),
				videoID = videoSRC[videoSRC.length - 1].split("?")[0],
				playerVars = {
					api: 1,
					player_id: id
				},
				widget =   '<div class="video-frame ' + id + '">\
								<div class="video-overlay"></div>\
								<img class="video-loader" src="img/loader.gif" alt="Video loader">\
								<div class="video-thumb">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
									<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
								</div>\
							</div>';

			if ( !el.parents(".video-frame").length ) {
				el.attr("id", id)
				  .attr("src", el.attr("src") + "?" + serialise(playerVars))
				  .wrap(widget);
			}

			initSVGs();

			vimVideos[i] = {
				elID: id
			};

			dataRequest("//vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);

			function build(data) {
				var videoThumb = data[0].thumbnail_large;
				el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
				vimFramePlayers();
			}
		});

		function vimFramePlayers() {
			if (typeof vimFrames === 'undefined') return;

			for (var i = 0; i < vimFrames.length; i++) {
				var currentPlayer = $("#" + vimFrames[i].elID),
					wrapper = $("." + vimFrames[i].elID),
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


	if ( $(".video-frame[data-video-service='vimeo']").length ) {
		$(".video-frame[data-video-service='vimeo']").each(function(i) {
			var el = $(this),
				id = "vimVideoPlayer-" + i,
				videoID = el.data("video-id"),
				playerVars = {
					api: 1,
					player_id: id
				},
				widget =   '<div class="video-overlay"></div>\
							<img class="video-loader" src="img/loader.gif" alt="Video loader">\
							<div class="video-thumb">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
							<iframe id="' + id + '" src="//player.vimeo.com/video/' + videoID + "?" + serialise(playerVars) + '" frameborder="0" allowfullscreen></iframe>';

			el.html("").addClass(id).append(widget);

			initSVGs();

			vimVideos[i] = {
				elID: id
			};

			dataRequest("//vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);

			function build(data) {
				var videoThumb = data[0].thumbnail_large;
				el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});
				vimVideoPlayers();
			}
		});

		function vimVideoPlayers() {
			if (typeof vimVideos === 'undefined') return;

			for (var i = 0; i < vimVideos.length; i++) {
				var currentPlayer = $("#" + vimVideos[i].elID),
					wrapper = $("." + vimVideos[i].elID),
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

	if ( config.application.debug ) console.log("Widget :: Videos: " + (ytVideos.length + ytFrames.length + vimVideos.length + vimFrames.length) + " initialised");
}