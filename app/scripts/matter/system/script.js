// Asynchronous script loading with callback function

matter.script = {
	load: function(src, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;

		if ( callback ) script.onload = callback;
		document.body.appendChild(script);
	}
}