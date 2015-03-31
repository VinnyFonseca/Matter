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
							<div class="video-thumb">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
						</div>';

		if ( !el.parents(".video-frame").length ) {
			el.attr("id", "ytFramePlayer-" + i)
			  .attr("src", el.attr("src") + "?" + serialise(playerVars))
			  .wrap(widget);
		}
		el.parents(".video-frame").children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

		initSVGs();

		ytFrames[i] = {
			elID: "ytFramePlayer-" + i
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
			});


			var el = $("." + ytFrames[i].elID),
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
				if ( event.data == YT.PlayerState.PLAYING ) if ( !videoDone ) videoDone = true;
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


	if ( $(".video-frame[data-video-service='youtube']").length ) {
		$(".video-frame[data-video-service='youtube']").each(function(i) {
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
			el.children(".video-thumb").css({"background": "url(" + videoThumb + ")"});

			initSVGs();

			ytVideos[i] = {
				elID: "ytVideoPlayer-" + i,
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
				});


				var el = $("." + ytVideos[i].elID),
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
					if ( event.data == YT.PlayerState.PLAYING ) if ( !videoDone ) videoDone = true;
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
	}

	if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
		if ( ytAPIVideoReady && ytAPIFrameReady ) {
			ytFramePlayers();
			ytVideoPlayers();
		} else {
			window.onYouTubeIframeAPIReady = function() {
				ytAPIFrameReady = true;
				ytFramePlayers();
			}
			$.getScript('https://www.youtube.com/iframe_api');

			window.onYouTubePlayerAPIReady = function() {
				ytAPIVideoReady = true;
				ytVideoPlayers();
			}
			$.getScript('https://www.youtube.com/player_api');
		}
	}




	// Vimeo

	$("iframe[src*='vimeo']").each(function(i) {
		var el = $(this),
			videoSRC = el.attr("src").split("/"),
			videoID = videoSRC[videoSRC.length - 1],
			playerVars = {
				api: 1,
				player_id: "vimVideoPlayer-" + i
			},
			widget =   '<div class="video-frame vimFramePlayer-' + i + '">\
							<div class="video-overlay"></div>\
							<img class="video-loader" src="img/loader.gif" alt="Video loader">\
							<div class="video-thumb">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
						</div>';

		if ( !el.parents(".video-frame").length ) {
			el.attr("id", "vimFramePlayer-" + i)
			  .attr("src", el.attr("src") + "?" + serialise(playerVars))
			  .wrap(widget);
		}

		initSVGs();

		vimVideos[i] = {
			elID: "vimFramePlayer-" + i
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
			var currentPlayer = $("#" + vimFrames[i].elID);


			var el = $("." + vimFrames[i].elID),
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

			function onPlayerPause() {
				el.removeClass("playing");
			}

			currentPlayer
				.on("load", onPlayerReady)
				.on("pause finish", onPlayerPause);


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


	if ( $(".video-frame[data-video-service='vimeo']").length ) {
		$(".video-frame[data-video-service='vimeo']").each(function(i) {
			var el = $(this),
				videoID = el.data("video-id"),
				playerVars = {
					api: 1,
					player_id: "vimVideoPlayer-" + i
				},
				widget =   '<div class="video-overlay"></div>\
							<img class="video-loader" src="img/loader.gif" alt="Video loader">\
							<div class="video-thumb">&nbsp;</div>\
							<div class="video-button">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
							<iframe id="vimVideoPlayer-' + i + '" src="//player.vimeo.com/video/' + videoID + "?" + serialise(playerVars) + '" frameborder="0" allowfullscreen></iframe>';

			el.html("").addClass("vimVideoPlayer-" + i).append(widget);

			initSVGs();

			vimVideos[i] = {
				elID: "vimVideoPlayer-" + i
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
				var currentPlayer = $("#" + vimVideos[i].elID);


				var el = $("." + vimVideos[i].elID),
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

				function onPlayerPause() {
					el.removeClass("playing");
				}

				currentPlayer
					.on("load", onPlayerReady)
					.on("pause finish", onPlayerPause);


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