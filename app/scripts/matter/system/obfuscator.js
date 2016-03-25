// Generate unique id from a string

matter.obfuscator = {
	create: function(index, counter) {
		if (typeof counter != "number" || counter <= 0 || (typeof index != "number" && typeof index != "string")) {
			return index;
		}
		index += "";

		while (index.length < counter) {
			index = "0" + index;
		}
		return index;
	},
	getHash: function(string) {
		var hash = 0,
			counter = (typeof string == "string") ? string.length : 0,
			index = 0;
		while (index < counter) {
			hash = ((hash << 5) - hash) + string.charCodeAt(index++);
			//hash = hash & hash; // Convert to 32bit integer
		}

		return (hash < 0) ? ((hash * -1) + 0xFFFFFFFF) : hash; // convert to unsigned
	},
	generate: function(string, bres) {
		var index;
		if (string === undefined || typeof string != "string") {
			if (!matter.obfuscator.uniqueIDCounter) {
				matter.obfuscator.uniqueIDCounter = 0;
			} else {
				++matter.obfuscator.uniqueIDCounter;
			}
			var date = new Date();
			index = string = date.getTime() + "" + matter.obfuscator.uniqueIDCounter;
		} else {
			index = matter.obfuscator.getHash(string);
		}
		return ((bres) ? "res:" : "") + index.toString(32) + "-" + this.create((string.length * 4).toString(16), 3);
	}
}