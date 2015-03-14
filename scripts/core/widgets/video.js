// Video

function initVideo() {
	if ( $(".video-frame").length ) {
		$(".video-frame").each(function() {
			var el = $(this),
				videoID = el.data("youtube-id"),
				widget =   '<div class="video-overlay"></div>\
							<img src="http://img.youtube.com/vi/' + videoID + '/hqdefault.jpg" alt="">\
							<div class="button-play">\
								<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src=\'img/icons/icon-play.png\'">\
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
						height: '250',
						width: '444',
						playerVars: {
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
				}
				$.getScript('https://www.youtube.com/player_api');
			}
			function onPlayerReady(event) {
				preview.on("click", function() {
					playOnClick(event);
				});
				button.fadeIn(350).on("click", function() {
					playOnClick(event);
				});
			}
			function onPlayerStateChange(event) {
				if(event.data === 0 || event.data === 2) {
					button.fadeIn(350);
					layer.fadeIn(350);
					preview.fadeIn(350);
				}

				if (event.data == YT.PlayerState.PLAYING && !done) {
					done = true;
				}
			}
			function stopVideo() {
			    player.stopVideo();
			}
			function playVideo() {
				player.playVideo();
			}
			function playOnClick(event) {
				button.fadeOut(350);
				layer.fadeOut(350);
				preview.fadeOut(350);
				if ( !config.application.touch ) event.target.setVolume(100).playVideo();
			}
		});
	}
}