// Query URLs

matter.query = {
	get: function(str) { // Gets URL query parameters
		return (str || window.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
			return n = n.split("="), this[n[0]] = n[1], this;
		}.bind({}))[0];
	}
}