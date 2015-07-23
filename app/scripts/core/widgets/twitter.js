/*********************************************************************
*  #### Twitter Post Fetcher v13.0 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals.
		factory();
	}
}(this, function() {
	var handlerConfig;
	var domNode = '';
	var startAt = 0;
	var maxTweets = 20;
	var parseLinks = true;
	var queue = [];
	var inProgress = false;
	var printTime = true;
	var printUser = true;
	var showRts = true;
	var showFlw = true;
	var showInteractionLinks = true;
	var showImages = false;
	var targetBlank = true;
	var formatterFunction = null;
	var customCallbackFunction = null;
	var supportsClassName = true;
	var lang = 'en';

	function handleTweets(tweets) {
		// console.log(tweets);

		if (customCallbackFunction === null) {
			var x = tweets.length;
			var n = 0;
			var element = document.getElementById(domNode);
			var html = '<ul>';
			while(n < x) {
				html += '<li>' + tweets[n] + '</li>';
				n++;
			}
			html += '</ul>';
			element.innerHTML = html;
		} else {
			customCallbackFunction(tweets);
		}
	}


	function strip(data) {
		return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
				.replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
				'');
	}

	function targetLinksToNewWindow(el) {
		var links = el.getElementsByTagName('a');
		for (var i = links.length - 1; i >= 0; i--) {
			links[i].setAttribute('target', '_blank');
		}
	}

	function getElementsByClassName (node, classname) {
		var a = [];
		var regex = new RegExp('(^| )' + classname + '( |$)');
		var elems = node.getElementsByTagName('*');
		for (var i = 0, j = elems.length; i < j; i++) {
				if(regex.test(elems[i].className)){
					a.push(elems[i]);
				}
		}
		return a;
	}

	function extractImageUrl(image_data) {
		if (image_data !== undefined) {
			var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
			return decodeURIComponent(data_src).split('"')[1];
		}
	}

	var twitterFetcher = {
		fetch: function(fetchConfig) {
			handlerConfig = fetchConfig;

			if (handlerConfig.startAt === undefined) handlerConfig.startAt = 0;
			if (handlerConfig.maxTweets === undefined) handlerConfig.maxTweets = 5;
			if (handlerConfig.enableLinks === undefined) handlerConfig.enableLinks = true;
			if (handlerConfig.showUser === undefined) handlerConfig.showUser = true;
			if (handlerConfig.showTime === undefined) handlerConfig.showTime = true;
			if (handlerConfig.dateFunction === undefined) handlerConfig.dateFunction = 'default';
			if (handlerConfig.showRetweet === undefined) handlerConfig.showRetweet = true;
			if (handlerConfig.showFollow === undefined) handlerConfig.showFollow = true;
			if (handlerConfig.customCallback === undefined) handlerConfig.customCallback = null;
			if (handlerConfig.showInteraction === undefined) handlerConfig.showInteraction = true;
			if (handlerConfig.showImages === undefined) handlerConfig.showImages = false;
			if (handlerConfig.linksInNewWindow === undefined) handlerConfig.linksInNewWindow = true;

			function setup() {
				inProgress = true;

				domNode = handlerConfig.domId;
				startAt = handlerConfig.startAt;
				maxTweets = handlerConfig.maxTweets + handlerConfig.startAt;
				parseLinks = handlerConfig.enableLinks;
				printUser = handlerConfig.showUser;
				printTime = handlerConfig.showTime;
				showRts = handlerConfig.showRetweet;
				showFlw = handlerConfig.showFollow;
				formatterFunction = handlerConfig.dateFunction;
				customCallbackFunction = handlerConfig.customCallback;
				showInteractionLinks = handlerConfig.showInteraction;
				showImages = handlerConfig.showImages;
				targetBlank = handlerConfig.linksInNewWindow;

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = '//cdn.syndication.twimg.com/widgets/timelines/' +
						handlerConfig.widgetId + '?&lang=' + (handlerConfig.lang || lang) + '&callback=twitterFetcher.callback&' +
						'suppress_response_codes=true&rnd=' + Math.random();
				document.getElementsByTagName('head')[0].appendChild(script);
			}

			if ( inProgress ) { queue.push(handlerConfig); } else { setup(); }
		},


		// Custom Tweet handler function

		handler: function(tweets) {
			// console.log(handlerConfig, tweets);

			var x = tweets.length;
			var n = 0;
			var element = $("#" + domNode);

			var html = '<div class="twitter-user"></div>';
				html += '<div class="content">';
				while(n < x) {
					html += '<hr>';
					html += '<div class="tweet-item">' + tweets[n] + '</div>';
					n++;
				}
				html += '</div>';
				html += '<div class="button primary input-medium twitter-follow">Follow</div>';

			element.html(html);

			if ( showRts ) {
				var userMulti = element.find(".user");

				userMulti.each(function() {
					$(this).find("img").attr("class", "box-logo");
					$(this).find("span").eq(0).replaceWith(function() { return $(this).html(); });
					$(this).find("span").eq(1).attr("class", "handle");
					$(this).find("a").attr('target', '_blank').addClass("no-icon").addClass("valign-middle");
				});
			} else {
				element.addClass("twitter-main");

				element.find(".twitter-user").append("<h4 class='user'>" + element.find(".user:first-child").html() + "</h4>");
				var userSingle = element.find(".twitter-user .user");

				userSingle.find("img").attr("class", "box-logo");
				userSingle.find("span").eq(0).replaceWith(function() { return $(this).html(); });
				userSingle.find("span").eq(1).attr("class", "handle");
				userSingle.find("a").attr('target', '_blank').addClass("no-icon");

				if ( showFlw ) element.find(".twitter-follow").show();
			}

			element.find(".button").on("click", function() {
				popupWindow('https://twitter.com/intent/user?screen_name=' + user.find('span').eq(1).html().substr(1), 'Twitter Follow', 640, 600);
				return false;
			});
		},

		// Custom function End


		callback: function(data) {
			var div = document.createElement('div');
			div.innerHTML = data.body;
			if (typeof(div.getElementsByClassName) === 'undefined') {
				 supportsClassName = false;
			}

			var tweets = [];
			var authors = [];
			var times = [];
			var images = [];
			var rts = [];
			var tids = [];
			var z = 0;

			if (supportsClassName) {
				var tmpClass = div.getElementsByClassName('tweet');
				while (z < tmpClass.length) {
					if (tmpClass[z].getElementsByClassName('retweet-credit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					if (!rts[z] || rts[z] && showRts) {
						tweets.push(tmpClass[z].getElementsByClassName('e-entry-title')[0]);
						tids.push(tmpClass[z].getAttribute('data-tweet-id'));
						authors.push(tmpClass[z].getElementsByClassName('p-author')[0]);
						times.push(tmpClass[z].getElementsByClassName('dt-updated')[0]);
						if (tmpClass[z].getElementsByClassName('inline-media')[0] !== undefined) {
							images.push(tmpClass[z].getElementsByClassName('inline-media')[0]);
						} else {
							images.push(undefined);
						}
					}
					z++;
				}
			} else {
				var tmpNoClass = getElementsByClassName(div, 'tweet');
				while (z < tmpNoClass.length) {
					tweets.push(getElementsByClassName(tmpNoClass[z], 'e-entry-title')[0]);
					tids.push(tmpNoClass[z].getAttribute('data-tweet-id'));
					authors.push(getElementsByClassName(tmpNoClass[z], 'p-author')[0]);
					times.push(getElementsByClassName(tmpNoClass[z], 'dt-updated')[0]);
					if (getElementsByClassName(tmpNoClass[z], 'inline-media')[0] !== undefined) {
						images.push(getElementsByClassName(tmpNoClass[z], 'inline-media')[0]);
					} else {
						images.push(undefined);
					}

					if (getElementsByClassName(tmpNoClass[z], 'retweet-credit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					z++;
				}
			}

			if (tweets.length > maxTweets) {
				tweets.splice(maxTweets, (tweets.length - maxTweets));
				authors.splice(maxTweets, (authors.length - maxTweets));
				times.splice(maxTweets, (times.length - maxTweets));
				rts.splice(maxTweets, (rts.length - maxTweets));
				images.splice(maxTweets, (images.length - maxTweets));
			}

			var arrayTweets = [];
			var x = tweets.length;
			var n = startAt;
			while(n < x) {
				if (typeof(formatterFunction) !== 'string') {
					var datetimeText = times[n].getAttribute('datetime');
					var newDate = new Date(times[n].getAttribute('datetime')
							.replace(/-/g,'/').replace('T', ' ').split('+')[0]);
					var dateString = formatterFunction(newDate, datetimeText);
					times[n].setAttribute('aria-label', dateString);

					if (tweets[n].innerText) {
						// IE hack.
						if (supportsClassName) {
							times[n].innerText = dateString;
						} else {
							var h = document.createElement('p');
							var t = document.createTextNode(dateString);
							h.appendChild(t);
							h.setAttribute('aria-label', dateString);
							times[n] = h;
						}
					} else {
						times[n].textContent = dateString;
					}
				}
				var op = '';
				if (parseLinks) {
					if (targetBlank) {
						targetLinksToNewWindow(tweets[n]);
						if (printUser) {
							targetLinksToNewWindow(authors[n]);
						}
					}
					if (printUser) {
						op += '<div class="user">' + strip(authors[n].innerHTML) +
								'</div>';
					}
					op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
					if (printTime) {
						op += '<p class="timePosted">' +
								times[n].getAttribute('aria-label') + '</p>';
					}
				} else {
					if (tweets[n].innerText) {
						if (printUser) {
							op += '<p class="user">' + authors[n].innerText + '</p>';
						}
						op += '<p class="tweet">' +  tweets[n].innerText + '</p>';
						if (printTime) {
							op += '<p class="timePosted">' + times[n].innerText + '</p>';
						}

					} else {
						if (printUser) {
							op += '<p class="user">' + authors[n].textContent + '</p>';
						}
						op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
						if (printTime) {
							op += '<p class="timePosted">' + times[n].textContent + '</p>';
						}
					}
				}
				if (showInteractionLinks) {
					op += '<p class="interact"><a href="https://twitter.com/intent/' +
							'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon"' + (targetBlank ? ' target="_blank">' : '>') +
							'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
							tids[n] + '" class="twitter_retweet_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Retweet</a>' +
							'<a href="https://twitter.com/intent/favorite?tweet_id=' +
							tids[n] + '" class="twitter_fav_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Favorite</a></p>';
				}

				if (showImages && images[n] !== undefined) {
					op += '<div class="media">' +
							'<img src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' +
							'</div>';
				}

				arrayTweets.push(op);
				n++;
			}

			// handleTweets(arrayTweets);
			twitterFetcher.handler(arrayTweets);
			inProgress = false;

			if (queue.length > 0) {
				twitterFetcher.fetch(queue[0]);
				queue.splice(0,1);
			}
		}
	};

	// It must be a global variable because it will be called by JSONP.
	window.twitterFetcher = twitterFetcher;

	return twitterFetcher;
}));


/*
* ### HOW TO CREATE A VALID ID TO USE: ###
* Go to www.twitter.com and sign in as normal, go to your settings page.
* Go to "Widgets" on the left hand side.
* Create a new widget for what you need eg "user time line" or "search" etc.
* Feel free to check "exclude replies" if you don't want replies in results.
* Now go back to settings page, and then go back to widgets page, you should
* see the widget you just created. Click edit.
* Now look at the URL in your web browser, you will see a long number like this:
* 345735908357048478
* Use this as your ID on config.js instead!
*/

var twitterConfig;

function initTwitter() {
	if ( $("[data-twitter]").length ) {
		$("[data-twitter]").each(function(i) {
			var el = $(this),
				domId = el.attr("id"),
				widgetId = el.data("widget-id"),
				startAt = el.data("start-at")
				maxTweets = el.data("max-tweets");

			if ( typeof domId === "undefined" ) {
				el.attr("id", "widget-twitter-" + i);

				twitterConfig = {
					domId: el.attr("id"),
					widgetId: typeof widgetId !== "undefined" ? widgetId : config.twitter.widgetId,
					startAt: typeof startAt !== "undefined" ? startAt : (config.twitter.startAt + config.twitter.maxTweets) * i,
					maxTweets: typeof maxTweets !== "undefined" ? maxTweets : config.twitter.maxTweets,
					enableLinks: config.twitter.enableLinks,
					showUser: config.twitter.showUser,
					showTime: config.twitter.showTime,
					showRetweet: config.twitter.showRetweet,
					showFollow: config.twitter.showFollow,
					showInteraction: config.twitter.showInteraction
				};

				twitterFetcher.fetch(twitterConfig);
			}
		});

		if ( config.application.debug ) console.log("Widget :: Twitter");
	}

	// Example config and call

	// var twitterConfig1 = {
	// 	domId: "twitter-1",
	// 	widgetId: "572802782449909760",
	// 	startAt: 2,
	// 	maxTweets: 2,
	// 	enableLinks: config.twitter.enableLinks,
	// 	showUser: config.twitter.showUser,
	// 	showTime: config.twitter.showTime,
	// 	showRetweet: true,
	// 	showFollow: config.twitter.showFollow,
	// 	showInteraction: config.twitter.showInteraction
	// };

	// twitterFetcher.fetch(twitterConfig1);
}