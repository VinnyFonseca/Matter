// Query URLs

matter.query = {
	get: function(url) { // Gets URL query parameters
		var url = typeof url !== "undefined" ? url : window.location.search;

		return (url).split("?")[1].split("&").map(function(n) {
			return n = n.split("="), this[n[0]] = n[1], this;
		}.bind({}))[0];
	}
}