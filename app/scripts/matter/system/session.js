// Local System

matter.session = {
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
			sessionStorage.setItem(name, value);
		};

		this.get = function(name) {
			return matter.session.parse(sessionStorage.getItem(name));
		};

		this.remove = function(name) {
			sessionStorage.removeItem(name);
		};

		this.destroy = function() {
			sessionStorage.clear();
		};

		this.dump = function() {
			var dump = [];
			for( var item in sessionStorage ) { dump.push(sessionStorage[item]); }
			return dump;
		};

		debug.log(":: Session System");
	}
}
