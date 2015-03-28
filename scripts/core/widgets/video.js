// Video

function initVideo() {
	if ( $(".video-frame").length ) {
		var apiVideoReady = false,
			apiFrameReady = false,
			done = false,
			ytVideoInfoList = [],
			ytFrameInfoList = [],
			vimFrameInfoList = [];



		// Load Youtube players

		$(".video-frame").each(function(i) {
			var el = $(this),
				videoID = el.data("video-id"),
				videoThumb = "//img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
				widget =   '<div class="video-overlay"></div>\
							<img class="video-loader" src="img/loader.gif" alt="Video loader">\
							<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
							<div id="ytVideoPlayer-' + i + '"></div>';

			el.html("").addClass("ytVideoPlayer-" + i).append(widget);
			initSVGs();

			ytVideoInfoList[i] = {
				elID: "ytVideoPlayer-" + i,
				width: '1280',
				height: '600',
				videoId: videoID
			};
		});

		// Load player api asynchronously.

		function ytVideoPlayers() {
			if (typeof ytVideoInfoList === 'undefined') return;

			for (var i = 0; i < ytVideoInfoList.length; i++) {
				var currentPlayer = new YT.Player(ytVideoInfoList[i].elID, {
					videoId: ytVideoInfoList[i].videoId,
					width: ytVideoInfoList[i].width,
					height: ytVideoInfoList[i].height,
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
				});


				var el = $("." + ytVideoInfoList[i].elID),
					preview = el.children(".video-thumb"),
					button = el.children(".video-button");

				function onPlayerReady() {
					el.addClass("loaded");

					button.off().on("click", function() {
						if ( !el.hasClass("playing") ) {
							el.addClass("playing");
							playVideo();
						} else {
							pauseVideo();
						}
					});

					preview.off().on("click", function() {
						el.addClass("playing");
						playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data == YT.PlayerState.PLAYING ) if ( !done ) done = true;
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						el.removeClass("playing");
					}
				}


				function playVideo() {
					if ( !config.application.touch ) currentPlayer.playVideo();
				}
				function pauseVideo() {
					currentPlayer.pauseVideo();
				}
				function stopVideo() {
					currentPlayer.stopVideo();
				}
			}

			$(".hero .video-frame .video-thumb").attr("src", "img/hero.jpg");
		}

		// Load iFrames

		$("iframe[src*='youtube']").each(function(i) {
			var el = $(this),
				videoSRC = el.attr("src").split("/"),
				videoID = videoSRC[videoSRC.length - 1],
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
				widget =   '<div class="video-frame ytFramePlayer-' + i + '">\
								<div class="video-overlay"></div>\
								<img class="video-loader" src="img/loader.gif" alt="Video loader">\
								<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
								<div class="video-button">\
									<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
									<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
								</div>\
							</div>';

			el
				.attr("id", "ytFramePlayer-" + i)
				.attr("src", el.attr("src") + "?" + serialise(playerVars))
				.wrap(widget);

			initSVGs();

			ytFrameInfoList[i] = {
				elID: el.attr("id")
			};
		});

		// Load iframe api asynchronously.

		function ytFramePlayers() {
			if (typeof ytFrameInfoList === 'undefined') return;

			for (var i = 0; i < ytFrameInfoList.length; i++) {
				var currentPlayer = new YT.Player(ytFrameInfoList[i].elID, {
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
				});


				var el = $("." + ytFrameInfoList[i].elID),
					preview = el.children(".video-thumb"),
					button = el.children(".video-button");

				function onPlayerReady() {
					el.addClass("loaded");

					button.off().on("click", function() {
						if ( !el.hasClass("playing") ) {
							el.addClass("playing");
							playVideo();
						} else {
							pauseVideo();
						}
					});

					preview.off().on("click", function() {
						el.addClass("playing");
						playVideo();
					});
				}

				function onPlayerStateChange(event) {
					if ( event.data == YT.PlayerState.PLAYING ) if ( !done ) done = true;
					if ( event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED ) { // Ended OR Paused
						el.removeClass("playing");
					}
				}


				function playVideo() {
					if ( !config.application.touch ) currentPlayer.playVideo();
				}
				function pauseVideo() {
					currentPlayer.pauseVideo();
				}
				function stopVideo() {
					currentPlayer.stopVideo();
				}
			}
		}

		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
			if ( apiVideoReady && apiFrameReady ) {
				ytVideoPlayers();
				ytFramePlayers();
			} else {
				window.onYouTubePlayerAPIReady = function() {
					apiVideoReady = true;
					ytVideoPlayers();
				}
				$.getScript('https://www.youtube.com/player_api');

				window.onYouTubeIframeAPIReady = function() {
					apiFrameReady = true;
					ytFramePlayers();
				}
				$.getScript('https://www.youtube.com/iframe_api');
			}
		}




		// Vimeo

		$("iframe[src*='vimeo']").each(function(i) {
			var el = $(this),
				videoSRC = el.attr("src").split("/"),
				videoID = videoSRC[videoSRC.length - 1];

			dataRequest("//vimeo.com/api/v2/video/" + videoID + ".json", "GET", build);

			function build(data) {
				var videoThumb = data[0].thumbnail_large;
					playerVars = {
						api: 1,
						player_id: "vimFramePlayer-" + i
					},
					widget =   '<div class="video-frame vimFramePlayer-' + i + '">\
									<div class="video-overlay"></div>\
									<img class="video-loader" src="img/loader.gif" alt="Video loader">\
									<div class="video-thumb" style="background: url(' + videoThumb + ');">&nbsp;</div>\
									<div class="video-button">\
										<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
										<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
									</div>\
								</div>';

				el
					.attr("id", "vimFramePlayer-" + i)
					.attr("src", el.attr("src") + "?" + serialise(playerVars))
					.wrap(widget);

				initSVGs();

				vimFrameInfoList[i] = {
					elID: el.attr("id")
				};

				vimFramePlayers();
			}
		});

		// Load iframe asynchronously.

		function vimFramePlayers() {
			if (typeof vimFrameInfoList === 'undefined') return;

			for (var i = 0; i < vimFrameInfoList.length; i++) {
				var currentPlayer = $("#" + vimFrameInfoList[i].elID);


				var el = $("." + vimFrameInfoList[i].elID),
					preview = el.children(".video-thumb"),
					button = el.children(".video-button");

				currentPlayer.on("load", onPlayerReady);

				function onPlayerReady() {
					el.addClass("loaded");

					button.off().on("click", function() {
						if ( !el.hasClass("playing") ) {
							el.addClass("playing");
							playVideo();
						} else {
							pauseVideo();
						}
					});

					preview.off().on("click", function() {
						el.addClass("playing");
						playVideo();
					});
				}

				function onPlayerPause() {
					el.removeClass("playing");
				}

				currentPlayer.on("pause finish", onPlayerPause);


				function playVideo() {
					if ( !config.application.touch ) currentPlayer.vimeo("play");
				}
				function pauseVideo() {
					currentPlayer.vimeo("pause");
				}
				function stopVideo() {
					currentPlayer.vimeo("stop");
				}
			}
		}
	}
}