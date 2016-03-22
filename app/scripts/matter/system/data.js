// Asynchronous requests

matter.data = {
	get: function(url, callback) {
		if ( matter.config.application.debug ) console.log('AJAX ~~ GET (' + url + ')');

		var request = $.ajax({
			url: url,
			type: "GET",
			data: "",
			success: function(data) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ GET Success (" + url + ")", data);
				if ( typeof callback !== "undefined" ) callback(data);
			},
			error: function(request, status, error) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ GET Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	},
	post: function(url, obj, callback) {
		if ( matter.config.application.debug ) console.log('AJAX ~~ POST (' + url + ')');

		console.log(obj);

		var request = $.ajax({
			url: url,
			type: "POST",
			data: obj,
			success: function(data) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ POST Success (" + url + ")", data);

				if ( typeof callback !== "undefined" ) {
					callback(data);
				} else {
					return true;
				}
			},
			error: function(request, status, error) {
				if ( matter.config.application.debug ) console.log("AJAX ~~ POST Error (" + url + ")", request, status, error, request.statusText);
			}
		});
	}
}