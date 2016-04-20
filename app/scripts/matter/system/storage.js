// Session System

matter.storage = {
	init: function() {
		if (JSON && JSON.stringify && JSON.parse) {
			var win = window.top || window;
			var store = win.name ? JSON.parse(win.name) : {};
		}

		$(window).on("unload", matter.storage.save);


		// Passive methods

		this.save = function() {
			if ( !store ) { return; }
			if ( store instanceof Object ) { store = JSON.stringify(store); }
			win.name = store;
		};

		this.parse = function() {
			if ( !store ) { return; }
			if ( store == null ) { return false; }
			if ( store[0] === "{" || store[0] === "[" ) { store = JSON.parse(store); }
		};


		// Active methods

		this.set = function(name, value) {
			matter.storage.parse();
			store[name] = value;
			matter.storage.save();
		};

		this.get = function(name) {
			matter.storage.parse();
			return store[name];
		};

		this.remove = function(name) {
			matter.storage.parse();
			delete store[name];
			matter.storage.save();
		};

		this.destroy = function() {
			store = {};
			matter.storage.save();
		};

		this.dump = function() {
			matter.storage.parse();
			return store;
		};

		debug.log(":: Storage System");
	}
}
