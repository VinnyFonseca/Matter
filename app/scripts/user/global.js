$(document).ready(function() {
	// First Visit Cookie

	if ( matter.cookie.get("firstVisit") === null ) {
		matter.cookie.set("firstVisit", "yes", 365);
    matter.notification.cookie = true;
		matter.notification.call("Cookie Disclaimer", matter.config.cookie.message, 0);
	}



	// Nav

	$(".nav-trigger").on("click", function() {
		$("header").toggleClass("active");
	});
	$(".nav-item").on("click", function() {
		$("header").removeClass("active");
	});
	$("html, body").on("click", function(event) {
		if ( !$(event.target).closest("header").length ) $("header").removeClass("active");
	});



	// Sharing

  var pageURL = window.location.href;
  var popW = 640;
  var popH = 480;
  var sharers = document.querySelectorAll('[href*="share:"]');

  for (var i = 0; i < sharers.length; i++) {
    sharers[i].addEventListener('click', function(event) {
      event.preventDefault();

      var shareURL, title, text, summary, media, desc, hashtags, mentions, finalURL;

      switch(this.href.replace('share:', '')) {
        case 'facebook':
          shareURL = 'http://www.facebook.com/sharer/sharer.php';
          finalURL = encodeURI(shareURL + '?' + 'u=' + pageURL);
        break;

        case 'twitter':
          shareURL = 'http://www.twitter.com/intent/tweet';
          text     = 'text=Tweet here';
          hashtags = 'hashtags=Hashtag';
          mentions = 'via=UserName';
          finalURL = encodeURI(shareURL + '?' + text + '&' + hashtags + '&' + mentions);
        break;

        case 'gplus':
          shareURL = 'https://plus.google.com/share';
          finalURL = encodeURI(shareURL + '?url=' + pageURL);
        break;

        case 'linkedin':
          shareURL = 'http://www.linkedin.com/shareArticle';
          title    = 'title=Title here';
          summary  = 'summary=Summary here';
          finalURL = encodeURI(shareURL + '?mini=true&' + 'url=' + pageURL + '&' + title + '&' + summary);
        break;

        case 'pinterest':
          shareURL = 'http://pinterest.com/pin/create/button/';
          media    = 'media=http://lorempixel.com/600/600/food';
          desc     = 'description=Description here';
          finalURL = encodeURI(shareURL + '?' + 'url=' + pageURL + '&' + media + '&' + desc);
        break;
      }

      popup(finalURL, "Window Title Here", popW, popH);
    });
  }
});



// Window Events

var controls = matter.measure(".controls");

var controlsPosition = function() {
	if ( matter.viewport().top > controls.top ) {
		$(".controls").addClass("scrolling");
	} else {
		$(".controls").removeClass("scrolling");
	}
}

$(window).on("scroll", function() {
	controlsPosition();
});