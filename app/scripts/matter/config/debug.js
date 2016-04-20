var Debugger = function(state) {
	this.debug = {};

	if ( state ) {
		for ( var i in console ) {
			if ( typeof console[i] == 'function' ) {
				this.debug[i] = console[i].bind(window.console);
			}
		}
	} else {
		for ( var j in console ) {
			if ( typeof console[j] == 'function' ) {
				this.debug[j] = function() {};
			}
		}
	}

	return this.debug;
}

var debug = Debugger(matter.config.application.debug);