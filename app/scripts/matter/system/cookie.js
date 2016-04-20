// Cookie System

matter.cookie = {
	init: function() {
		// Passive methods

		this.parse = function(value) {
			if ( !value ) { return; }
			if ( value == null ) { return false; }
			if ( value[0] === "{" || value[0] === "[" ) { value = JSON.parse(value); }
			return value;
		};


		// Active methods

		this.set = function(key, value, ends, domain, path) {
			if ( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key) ) { return false; }

			if ( value instanceof Object ) { value = JSON.stringify(value); }

			var expires = "";

			if ( ends ) {
				switch ( ends.constructor ) {
					case Number:
						var currentDate = new Date(),
							expiryDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24 * ends));

						expires = ends === Infinity ? "Fri, 31 Dec 9999 23:59:59 GMT" : expiryDate.toGMTString();
					break;

					case String:
						expires = ends;
					break;

					case Date:
						expires = ends.toGMTString();
					break;
				}
			}

			if ( !domain ) domain = window.location.host.split(":")[0];
			if ( !path ) path = "/";

			document.cookie = key + "=" + value + "; expires=" + expires + "; domain=" + domain + "; path=" + path;

			return true;
		};

		this.get = function(key) {
			return matter.cookie.parse(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + key.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null);
		};

		this.has = function(key) {
			return (new RegExp("(?:^|;\\s*)" + key.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		};

		this.remove = function(key, domain, path) {
			if ( !key ) { return false; }
			if ( !domain ) domain = window.location.host;
			if ( !path ) path = "/";

			value = "";
			expires = "Thu, 01 Jan 1970 00:00:00 GMT";

			document.cookie = key + "=" + value + "; expires=" + expires + "; domain=" + domain + "; path=" + path;

			return true;
		};

		debug.log(":: Cookie System");
	}
}