// Video

function initVideo() {
	if ( $(".video-frame").length ) {
		$(".video-frame").each(function(i) {
			var el = $(this),
				videoID = el.data("youtube-id"),
				widget =   '<div class="video-overlay"></div>\
							<img src="http://img.youtube.com/vi/' + videoID + '/hqdefault.jpg" alt="">\
							<div class="button-play">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
								<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-pause.png\'">\
							</div>\
							<div id="ytplayer"></div>';

				el.append(widget);
				initSVGs();

				layer = el.children(".video-overlay");
				preview = el.children("img");
				button = el.children(".button-play"),
				frame = $("#" + containerId);


			// Load player api asynchronously.

			var player,
				done = false,
				containerId = 'ytplayer';

			if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
				window.onYouTubePlayerAPIReady = function() {
					player = new YT.Player(containerId, {
						videoId: videoID,
						height: '600',
						width: '1280',
						playerVars: {
							wmode:'transparent',
							modestbranding: 1,
							enablejsapi: 1,
							html5: 1,
							showinfo: 0,
							controls: 0,
							autohide: 1
						},
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					});
				}
				$.getScript('https://www.youtube.com/player_api');
			}
			function onPlayerReady(event) {
				preview.on("click", function() {
					playVideo();
				});

				button.fadeIn(350).on("click", function() {
					if ( !$(this).hasClass("pause") ) {
						playVideo();
					} else {
						pauseVideo();
					}
				});
			}
			function onPlayerStateChange(event) {
				if ( event.data === 1 ) { // Playing
					button.addClass("pause");
					layer.fadeOut(350);
					preview.fadeOut(350);
				}
				if ( event.data === 0 || event.data === 2 ) { // Ended OR Paused
					button.removeClass("pause");
					layer.fadeIn(350);
					preview.fadeIn(350);
				}

				if ( event.data == YT.PlayerState.PLAYING && !done ) done = true;
			}
			function pauseVideo() {
			    player.pauseVideo();
			}
			function stopVideo() {
			    player.stopVideo();
			}
			function playVideo() {
				player.playVideo();
			}
		});
	}
}