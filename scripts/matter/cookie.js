// Cookie System

function initCookies() {
	var cookieSystem = {
		get: function(sKey) {
			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		set: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						var currentDate = new Date(),
							expiryDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * vEnd));

						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + expiryDate.toGMTString();
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toGMTString();
						break;
				}
			}
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		remove: function(sKey, sPath, sDomain) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
			return true;
		},
		has: function(sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		}
	};


	var firstVisitCookie = cookieSystem.get("firstVisit");

	if ( firstVisitCookie === null ) {
		cookieSystem.set("firstVisit", "yes", 365);
		var cookieType = "bar",
			cookieDelay = 0,
			cookieTone = "warning",
			cookieMessage = "This is a sample text stating how Matter uses cookies to give you a better experience. View our <a href='#' target='_blank'>Privacy Policy</a> to read more about how we use them. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.";

		notify(cookieMessage, cookieTone, cookieType, cookieDelay);
	}

	if ( config.application.debug ) console.log("Init :: Cookie System");
}