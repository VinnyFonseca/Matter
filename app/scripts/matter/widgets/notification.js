// Notifications

matter.notification = {
  count: 0,
  cookie: false,

  call: function(title, message, delay, tone) {
  	title = title ? title : matter.config.notification.title;
  	delay = delay || delay === 0 ? delay : matter.config.notification.delay;
  	tone = tone ? tone : matter.config.notification.tone;

    console.log(title, delay, tone)

  	if ( matter.config.notification.active || matter.config.cookie.active ) {
  		var notification = '<div class="notification notification-' + matter.notification.count + '" data-type="' + tone + '">\
  								<img class="svg icon icon-' + tone + '" src="' + matter.config.application.base + 'img/icons/icon-' + tone + '.svg" width="24" height="24">\
  								<span class="notification-title">' + title + '</span>\
  								<span class="notification-message">\
  									' + message + '\
  								</span>\
  							</div>';

  		$(".notification-wrapper").append(notification);
  		matter.svg.init();
  		var el = $(".notification-" + matter.notification.count);

  		var clear = function() {
  			el.removeClass("active");

  			setTimeout(function() {
  				$(".notification-wrapper").removeClass("cookie");
  				el.remove();
  			}, 300);
  		}

  		if ( delay !== 0 ) timer = new matter.timer(clear, delay);

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

  		if ( matter.notification.cookie ) {
  			$(".notification-wrapper").addClass("cookie");
  			matter.notification.cookie = false;
  		}

  		setTimeout(function() {
  			el.addClass("active");
  		}, 10);

  		matter.notification.count++;

  		debug.log("== Notification | Delay: " + delay);
  	}
  },

  init: function() {
  	if ( $("[data-notification]").length ) {
  		$("[data-notification]").on("click", function() {
  			var title = $(this).data("title"),
  				message = $(this).data("message"),
  				delay = parseInt($(this).data("delay")),
  				tone = $(this).data("tone");

  			matter.notification.call(title, message, delay, tone);
  		});

  		debug.log(":: Notifications");
  	}
  }
}
