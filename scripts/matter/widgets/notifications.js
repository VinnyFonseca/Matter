// Notifications

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

function notify(message, tone, delay) {
	tone = (typeof tone === "undefined") || tone === "" ? config.notification.tone : tone;
	delay = (typeof delay === "undefined") || delay === "" ? config.notification.delay : delay;

	var isOn = typeof timer !== "undefined";
	if (isOn) timer.stop();
	$(".notification").removeClass("active");

	if ( delay > 0 ) {
		timer = new Timer(function() {
			$(".notification").removeClass("active");
		}, delay);
	}

	$(".notification")
		.addClass("active")
		.removeClass("default")
		.removeClass("success")
		.removeClass("warning")
		.removeClass("failure")
		.addClass(tone)
		.on("mouseenter", function() {
			if ( delay > 0 ) timer.pause();
		})
		.on("mouseleave", function() {
			if ( delay > 0 ) timer.resume();
		})
		.on("click", function() {
			$(this).removeClass("active");
		})
		.children(".notification-message").html(message);

	if (config.application.debug) console.log("Trigger :: Notification");
}

function initNotifications() {
	$(".notification-trigger").on("click", function() {
		var message = $(this).attr("data-message"),
			tone = $(this).attr("data-tone"),
			delay = parseInt($(this).attr("data-delay"));

		notify(message, tone, delay);
	});

	if (config.application.debug) console.log("Init :: Notifications");
}