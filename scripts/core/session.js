// Session System

var sessionSystem;

var initSession = function() {
	if (JSON && JSON.stringify && JSON.parse) {
		var win = window.top || window;
		var store = win.name ? JSON.parse(win.name) : {};

		var sessionSave = function() {
			win.name = JSON.stringify(store);
		};

		if (window.addEventListener) window.addEventListener("unload", sessionSave, false);
		else if (window.attachEvent) window.attachEvent("onunload", sessionSave);
		else window.onunload = sessionSave;

		sessionSystem = {
			set: function(name, value) {
				store[name] = value;
				sessionSave();
			},
			get: function(name) {
				// alert(JSON.stringify(store[name]));
				return store[name];
			},
			remove: function(name) {
				delete store[name];
				sessionSave();
			},
			clear: function() {
				store = {};
				sessionSave();
			},
			dump: function() {
				return store;
			}
		}
	}

	if ( config.application.debug ) console.log("System :: Session System");
}