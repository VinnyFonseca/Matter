// Notifications

var notificationCount = 0;

function Timer(callback, delay) {
	var timerId, start, remaining = delay;

	this.stop = function() {
		window.clearTimeout(timerId);
		remaining = delay;
	};
	this.pause = function() {
		window.clearTimeout(timerId);
		remaining -= new Date() - start;
	};
	this.resume = function() {
		start = new Date();
		window.clearTimeout(timerId);
		timerId = window.setTimeout(callback, remaining);
	};
	this.resume();
}

function notify(message, delay, tone) {
	delay = typeof delay === "undefined" || isNaN(delay) || delay === "" ? config.notification.delay : delay;
	tone = typeof tone === "undefined" || tone === "" ? config.notification.tone : tone;

	// var isOn = typeof timer !== "undefined";
	// if (isOn) timer.stop();

	function notifyShow() {
		var notification = '<div class="notification notification-' + notificationCount + '" data-type="' + tone + '">\
								<span class="notification-message">' + message + '</span>\
								<div class="notification-close">\
									<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">\
								</div>\
							</div>';

		$(".notification-wrapper").append(notification);
		var el = $(".notification-" + notificationCount);

		if ( delay !== 0 ) {
			timer = new Timer(function() {
				el.removeClass("active");
				setTimeout(function() {
					el.remove();
				}, 300);
			}, delay);
		}

		el
			.addClass(tone)
			.off("mouseenter")
			.on("mouseenter", function() {
				if ( delay !== 0 ) timer.pause();
			})
			.off("mouseleave")
			.on("mouseleave", function() {
				if ( delay !== 0 ) timer.resume();
			})
			.on("click", function() {
				el.removeClass("active");
				setTimeout(function() {
					el.remove();
				}, 300);
			});

		setTimeout(function() {
			el.addClass("active");
		}, 10);

		notificationCount++;

		if ( config.application.debug ) console.log("Trigger :: Notification | Delay: " + delay);
	}

	notifyShow();

	// if ( $(".notification").hasClass("active") ) {
	// 	$(".notification").removeClass("active");
	// 	setTimeout(notifyShow, 300);
	// } else {
	// 	notifyShow();
	// }
}

function initNotifications() {
	if ( $("[data-notification]").length ) {
		$("[data-notification]").on("click", function() {
			var message = $(this).attr("data-message"),
				delay = parseInt($(this).attr("data-delay")),
				tone = $(this).attr("data-tone");

			notify(message, delay, tone);
		});

		if ( config.application.debug ) console.log("Widget :: Notifications");
	}
}