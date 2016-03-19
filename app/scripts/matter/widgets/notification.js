// Notifications

var notificationCount = 0;
var cookieNotify = false;

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

var notify = function(title, message, delay, tone) {
	title = typeof title === "undefined" || title === "undefined" || title === "" ? matter.config.notification.title : title;
	delay = typeof delay === "undefined" || delay === "undefined" || isNaN(delay) || delay === "" ? matter.config.notification.delay : delay;
	tone = typeof tone === "undefined" || tone === "undefined" || tone === "" ? matter.config.notification.tone : tone;

	var notifyShow = function() {
		var notification = '<div class="notification notification-' + notificationCount + '" data-type="' + tone + '">\
								<img class="svg icon icon-' + tone + '" src="' + matter.config.application.base + 'img/icons/icon-' + tone + '.svg" width="24" height="24">\
								<span class="notification-title">' + title + '</span>\
								<span class="notification-message">\
									' + message + '\
								</span>\
							</div>';

		$(".notification-wrapper").append(notification);
		matter.svg.init();
		var el = $(".notification-" + notificationCount);

		var clear = function() {
			el.removeClass("active");
			setTimeout(function() {
				$(".notification-wrapper").removeClass("cookie");
				el.remove();
			}, 300);
		}

		if ( delay !== 0 ) timer = new Timer(clear, delay);

		el
			.off("mouseenter")
			.on("mouseenter", function() {
				if ( delay !== 0 ) timer.pause();
			})
			.off("mouseleave")
			.on("mouseleave", function() {
				if ( delay !== 0 ) timer.resume();
			})
			.on("click", clear);

		if ( cookieNotify ) {
			$(".notification-wrapper").addClass("cookie");
			cookieNotify = false;
		}

		setTimeout(function() {
			el.addClass("active");
		}, 10);

		notificationCount++;

		if ( matter.config.application.debug ) console.log("Trigger :: Notification | Delay: " + delay);
	}

	if ( matter.config.notification.active ) {
		notifyShow();
	} else {
		if ( matter.config.cookie.active ) notifyShow();
	}
}

var initNotifications = function() {
	if ( $("[data-notification]").length ) {
		$("[data-notification]").on("click", function() {
			var title = $(this).attr("data-title"),
				message = $(this).attr("data-message"),
				delay = parseInt($(this).attr("data-delay")),
				tone = $(this).attr("data-tone");

			notify(title, message, delay, tone);
		});

		if ( matter.config.application.debug ) console.log("Widget :: Notifications");
	}
}