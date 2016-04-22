// Query URLs

matter.query = {
	get: function(url) { // Gets URL query parameters
		url = typeof url !== "undefined" ? url : window.location.href;

		if ( url.has("?") ) {
			return (url).split("?")[1].split("&").map(function(n) {
				return n = n.split("="), this[n[0]] = n[1], this;
			}.bind({}))[0];
		} else {
			debug.log("No query strings attached to the requested URL.");
			return false;
		}
	}
}