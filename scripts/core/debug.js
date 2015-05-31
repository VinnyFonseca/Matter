// Responsive Breakpoint Debugging and Discovery

var initBreakpointDebug = function(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	if (script.readyState) {
		script.onreadystatechange = function() {
			if (script.readyState == 'loaded' || script.readyState == 'complete') {
				script.onreadystatechange = null;
				callback();
			}
		}
	} else {
		script.onload = function() {
			callback();
		}
	}
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

$(document).ready(function() {
	if ( config.application.debug ) {
		$(".rwd-debug").removeClass("hidden").on("click", function() {
			initBreakpointDebug('scripts/core/debug/breakpoint.js', function() {
				var doc = document;
				doc.write('<!DOCTYPE html>' + '<html>' + '<head>' + '<meta charset="UTF-8">' + '<title>Breakpoint Test - ' + doc.title + '</title>' + '<link rel="stylesheet" href="styles/core/debug/bookmark.css">' + '<script src="scripts/core/debug/bookmark.js"></script>' + '</head>' + '<body data-url="' + doc.URL + '">' + '<header id="topHeader" class="clearfix">' + '<a href="#"></a>' + '</section>' + '<section id="bpCount">' + '<div id="count">00</div>' + '<div id="countText"><span>BREAKPOINTS FOUND</span></div>' + '</section>' + mqUniqueBP + '</header>' + '<section id="qcWWW">' + '<ul id="qcWW"></ul>' + '</section>' + '</body>' + '</html>');
			});
		});
	}
});