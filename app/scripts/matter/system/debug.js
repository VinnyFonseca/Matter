// Responsive Breakpoint Debugging and Discovery

matter.debug = {
  init: function() {
  	if ( matter.config.application.debug && !matter.config.application.touch ) {
  		$(".debug-trigger").removeClass("hidden").on("click", function() {
  			matter.debug.call('/scripts/debug/breakpoint.js', matter.debug.inject);
  		});
  	}
  },

  call: function(url, callback) {
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
  },

  inject: function() {
    var doc = document;
    doc.write('\
      <!DOCTYPE html>\
      <html>\
        <head>\
          <meta charset="UTF-8">\
          <title>Breakpoint Test - ' + doc.title + '</title>\
          <link rel="stylesheet" href="/styles/debug/bookmark.css">\
          <script src="/scripts/debug/bookmark.js"></script>\
        </head>\
        <body data-url="' + doc.URL + '">\
          <header id="topHeader" class="clearfix">\
            <a href="#"></a>\
            <section id="bpCount">\
              <div id="count">00</div>\
              <div id="countText"><span>BREAKPOINTS FOUND</span></div>\
            </section>\
            ' + mqUniqueBP + '\
          </header>\
          <section id="qcWWW">\
            <div id="qcWW"></div>\
          </section>\
        </body>\
      </html>\
    ');
  }
}