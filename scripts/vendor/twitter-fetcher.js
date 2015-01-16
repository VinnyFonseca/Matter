/*********************************************************************
*  #### Twitter Post Fetcher v11.0 ####
*  Coded by Jason Mayes 2013. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/

var twitterFetcher = function() {
	var domNode = '';
	var maxTweets = 20;
	var parseLinks = true;
	var queue = [];
	var inProgress = false;
	var printUser = true;
	var printTime = true;
	var formatterFunction = null;
	var supportsClassName = true;
	var showRts = true;
	var customCallbackFunction = null;
	var showInteractionLinks = true;

	function strip(data) {
		return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
				.replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
				'');
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

	return {
		fetch: function(fetchConfig) {
			if (fetchConfig.maxTweets === undefined) {
				fetchConfig.maxTweets = 20;
			}
			if (fetchConfig.enableLinks === undefined) {
				fetchConfig.enableLinks = true;
			}
			if (fetchConfig.showUser === undefined) {
				fetchConfig.showUser = true;
			}
			if (fetchConfig.showFollow === undefined) {
				fetchConfig.showFollow = true;
			}
			if (fetchConfig.showTime === undefined) {
				fetchConfig.showTime = true;
			}
			if (fetchConfig.dateFunction === undefined) {
				fetchConfig.dateFunction = 'default';
			}
			if (fetchConfig.showRetweet === undefined) {
				fetchConfig.showRetweet = true;
			}
			if (fetchConfig.customCallback === undefined) {
				fetchConfig.customCallback = null;
			}
			if (fetchConfig.showInteraction === undefined) {
				fetchConfig.showInteraction = true;
			}

			if (inProgress) {
				queue.push(fetchConfig);
			} else {
				inProgress = true;

				domNode = fetchConfig.domId;
				maxTweets = fetchConfig.maxTweets;
				parseLinks = fetchConfig.enableLinks;
				printUser = fetchConfig.showUser;
				printTime = fetchConfig.showTime;
				showRts = fetchConfig.showRetweet;
				formatterFunction = fetchConfig.dateFunction;
				customCallbackFunction = fetchConfig.customCallback;
				showInteractionLinks = fetchConfig.showInteraction;

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = '//cdn.syndication.twimg.com/widgets/timelines/' +
						fetchConfig.id + '?&lang=en&callback=twitterFetcher.callback&' +
						'suppress_response_codes=true&rnd=' + Math.random();
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		},

		handler: function(tweets) {
			var x = tweets.length;
			var n = 0;
			var element = document.getElementById(config.twitter.domId);

			var html = '<div class="twitter-user"></div>';

				html += '<div class="content feed">';
				while(n < x) {
					html += '<hr>';
					html += '<div class="tweet-item">' + tweets[n] + '</div>';
					n++;
				}
				html += '</div>';

				html += '<div class="button input-medium center twitter-follow">Follow Us</div>';

			element.innerHTML = html;


			if ( config.twitter.showRetweet ) {
				document.getElementById(config.twitter.domId).className = config.twitter.domId + " framed multi";

				for ( var i = 0; i < document.querySelectorAll(".user").length; i++ ) {
					var user = document.querySelectorAll(".user")[i];
						user.getElementsByTagName("a")[0].setAttribute('target', '_blank');
						user.getElementsByTagName("a")[0].className = "no-icon valign-middle";
				}
			} else {
				document.getElementById(config.twitter.domId).className = config.twitter.domId + " framed twitter-main";

				var user = document.createElement('h4');
					user.className = "user";
					user.innerHTML = document.querySelectorAll(".user")[0].innerHTML;

					user.getElementsByTagName("img")[0].className = "box-logo";
					user.getElementsByTagName("span")[0].remove();
					user.getElementsByTagName("span")[0].className = "handle";
					user.getElementsByTagName("a")[0].setAttribute('target', '_blank');
					user.getElementsByTagName("a")[0].className = "no-icon valign-middle";

				document.querySelector(".twitter-user").appendChild(user);
			}


			if (config.twitter.showFollow) $("#" + config.twitter.domId).find(".twitter-follow").show(); else $("#" + config.twitter.domId).find(".twitter-follow").hide();

			function popupWindow(url, title, w, h) {
				var left = (screen.width/2)-(w/2);
				var top = (screen.height/2)-(h/2);
				return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
			}

			document.getElementById(config.twitter.domId).querySelector(".button").onclick = function() {
				popupWindow('https://twitter.com/intent/user?screen_name=' + user.getElementsByTagName('span')[0].innerHTML.substr(1), 'Twitter Follow', 640, 600);
				return false;
			};
		},

		callback: function(data) {
			var div = document.createElement('div');
			div.innerHTML = data.body;
			if (typeof(div.getElementsByClassName) === 'undefined') supportsClassName = false;

			var tweets = [];
			var authors = [];
			var times = [];
			var rts = [];
			var tids = [];
			var x = 0;

			if (supportsClassName) {
				var tmp = div.getElementsByClassName('tweet');
				while (x < tmp.length) {
					if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					if (!rts[x] || rts[x] && showRts) {
						tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
						tids.push(tmp[x].getAttribute('data-tweet-id'));
						authors.push(tmp[x].getElementsByClassName('p-author')[0]);
						times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
					}
					x++;
				}
			} else {
				var tmp = getElementsByClassName(div, 'tweet');
				while (x < tmp.length) {
					tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
					tids.push(tmp[x].getAttribute('data-tweet-id'));
					authors.push(getElementsByClassName(tmp[x], 'p-author')[0]);
					times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
					if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
						rts.push(true);
					} else {
						rts.push(false);
					}
					x++;
				}
			}

			if (tweets.length > maxTweets) {
				tweets.splice(maxTweets, (tweets.length - maxTweets));
				authors.splice(maxTweets, (authors.length - maxTweets));
				times.splice(maxTweets, (times.length - maxTweets));
				rts.splice(maxTweets, (rts.length - maxTweets));
			}

			var arrayTweets = [];
			var x = tweets.length;
			var n = 0;

			while(n < x) {
				if (typeof(formatterFunction) !== 'string') {
					var newDate = new Date(times[n].getAttribute('datetime')
							.replace(/-/g,'/').replace('T', ' ').split('+')[0]);
					var dateString = formatterFunction(newDate);
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
							'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon">' +
							'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
							tids[n] + '" class="twitter_retweet_icon">Retweet</a>' +
							'<a href="https://twitter.com/intent/favorite?tweet_id=' +
							tids[n] + '" class="twitter_fav_icon">Favorite</a></p>';
				}
				arrayTweets.push(op);
				n++;
			}
			twitterFetcher.handler(arrayTweets);
			inProgress = false;

			if (queue.length > 0) {
				twitterFetcher.fetch(queue[0]);
				queue.splice(0,1);
			}
		}
	};
}();

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
* Use this as your ID below instead!
*/
