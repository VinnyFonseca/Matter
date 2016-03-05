// Session System

if (JSON && JSON.stringify && JSON.parse) {
	var win = window.top || window;
	var store = win.name ? JSON.parse(win.name) : {};
}

matter.session = {
	save: function() {
		win.name = JSON.stringify(store);
	},
	destroy: function() {
		store = {};
		matter.session.save();
	},
	dump: function() {
		return store;
	},
	init: function() {
		if (window.addEventListener) window.addEventListener("unload", matter.session.save, false);
		else if (window.attachEvent) window.attachEvent("onunload", matter.session.save);
		else window.onunload = matter.session.save;

		if ( matter.config.application.debug ) console.log("System :: Session System");
	},
	set: function(name, value) {
		store[name] = value;
		matter.session.save();
	},
	get: function(name) {
		return store[name];
	},
	remove: function(name) {
		delete store[name];
		matter.session.save();
	}
}
