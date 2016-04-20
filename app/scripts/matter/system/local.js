// Local System

matter.local = {
	init: function() {
		// Passive methods

		this.parse = function(value) {
			if ( !value ) { return; }
			if ( value == null ) { return false; }
			if ( value[0] === "{" || value[0] === "[" ) { value = JSON.parse(value); }
			return value;
		};


		// Active methods

		this.set = function(name, value) {
			if ( !name || !value ) { return; }
			if ( value instanceof Object ) { value = JSON.stringify(value); }
			localStorage.setItem(name, value);
		};

		this.get = function(name) {
			return matter.local.parse(localStorage.getItem(name));
		};

		this.remove = function(name) {
			localStorage.removeItem(name);
		};

		this.destroy = function() {
			localStorage.clear();
		};

		this.dump = function() {
			var dump = [];
			for( var item in localStorage ) { dump.push(localStorage[item]); }
			return dump;
		};

		debug.log(":: Local System");
	}
}
