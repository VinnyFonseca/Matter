// Asynchronous requests

matter.data = {
	get: function(url, callback) {
		debug.log('~~ GET (' + url + ')');

		var request = $.ajax({
			url: url,
			type: "GET",
			data: "",
			success: function(data) {
				// debug.log("~~ GET Success (" + url + ")", data);
				debug.log("~~ GET Success (" + url + ")");
				if ( typeof callback !== "undefined" ) callback(data);
			},
			error: function(request, status, error) {
				debug.log("~~ GET Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	},
	post: function(url, obj, callback) {
		debug.log('~~ POST (' + url + ')');

		var request = $.ajax({
			url: url,
			type: "POST",
			data: obj,
			success: function(data) {
				// debug.log("~~ POST Success (" + url + ")", data);
				debug.log("~~ POST Success (" + url + ")");

				if ( typeof callback !== "undefined" ) {
					callback(data);
				} else {
					return true;
				}
			},
			error: function(request, status, error) {
				debug.log("~~ POST Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	}
}