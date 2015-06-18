// Notifications

var notificationCount = 0;

var Timer = function(callback, delay) {
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

var notify = function(message, delay, tone) {
	delay = typeof delay === "undefined" || isNaN(delay) || delay === "" ? config.notification.delay : delay;
	tone = typeof tone === "undefined" || tone === "" ? config.notification.tone : tone;

	var notifyShow = function() {
		var notification = '<div class="notification notification-' + notificationCount + '" data-type="' + tone + '">\
								<span class="notification-message">' + message + '</span>\
								<div class="notification-close">\
									<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src=\'img/icons/icon-close.png\'">\
								</div>\
							</div>';

		$(".notification-wrapper").append(notification);
		var el = $(".notification-" + notificationCount);

		var clear = function() {
			el.removeClass("active");
			setTimeout(function() {
				$(".notification-wrapper").removeClass("cookie");
				el.remove();
			}, 300);
		}

		if ( delay !== 0 ) {
			timer = new Timer(clear, delay);
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
			.on("click", clear);

		setTimeout(function() {
			el.addClass("active");
		}, 10);

		notificationCount++;

		if ( config.application.debug ) console.log("Trigger :: Notification | Delay: " + delay);
	}

	notifyShow();
}

var initNotifications = function() {
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