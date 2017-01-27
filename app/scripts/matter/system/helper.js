// Helper

// Arrays

// ECMAScript5

if ( !Array.isArray ) {
	Array.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	}
}

if ( !Array.prototype.indexOf ) {
	Array.prototype.indexOf = function(searchElement) {
		"use strict";

		if (this == null) throw new TypeError();

		var n = 0;
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) return -1;

		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}

		if (n >= len) return -1;

		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}

		return -1;
	}
}

if ( !Array.prototype.forEach ) {
	Array.prototype.forEach = function (callbackfn, thisArg) {
		var o = Object(this),
			lenValue = o.length,
			len = lenValue >>> 0,
			t,
			k,
			Pk,
			kPresent,
			kValue;

		if (typeof callbackfn !== 'function') throw new TypeError();

		t = thisArg ? thisArg : undefined;

		k = 0;
		while (k < len) {
			Pk = k.toString();
			kPresent = o.hasOwnProperty(Pk);

			if (kPresent) {
				kValue = o[Pk];
				callbackfn.call(t, kValue, k, o);
			}

			k += 1;
		}

		return undefined;
	};
}


// Single

if ( !Array.prototype.clean ) {
	Array.prototype.clean = function(deleteValue) { // Delete empty values
		for ( var i = 0; i < this.length; i++ ) {
			if ( this[i] == deleteValue ) {
				this.splice(i, 1);
				i--;
			}
		}

		return this;
	}
}

if ( !Array.prototype.uniques ) {
	Array.prototype.uniques = function() { // Gather unique values
		return this.reduce(function(a, b){
			if ( a.indexOf(b) < 0 ) a.push(b);

			return a;
		}, []);
	}
}

if ( !Array.prototype.contains ) {
	Array.prototype.contains = function(value) { // Contains specified value
		for ( var i = 0; i < this.length; i++ ) {
			if ( this[i] === value ) return true;
		}

		return false;
	}
}

if ( !Array.prototype.duplicates ) {
	Array.prototype.duplicates = function() { // Gather duplicate values
		var arrayLength = this.length, i, j, result = [];

		for ( i = 0; i < arrayLength; i++ ) {
			for ( j = 0; j < arrayLength; j++ ) {
				if (this[i] == this[j] && i != j && !result.contains(this[i])) {
					result.push(this[i]);
				}
			}
		}

		return result;
	}
}

if ( !Array.prototype.deduplicate ) {
	Array.prototype.deduplicate = function() {
    return this.filter(function(item, pos) {
      return this.indexOf(item) == pos;
    });
	}
}

// if ( !Array.prototype.reduce ) {
	Array.prototype.reduce = function() { // Join all internal arrays
		var a = [];

		for ( var i = 0; i < this.length; i++ ) {
			for ( var j = 0; j < this[i].length; j++ ) {
				a.push(this[i][j]);
			}
		}

		return a;
	}
// }

if ( !Array.prototype.has ) {
	Array.prototype.has = function(value) {
		return this.indexOf(value) > -1;
	}
}




// Objects

var serialize = function(obj) {
	var str = [];

	for ( var p in obj ) {
		if ( obj.hasOwnProperty(p) ) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}

	return str.join("&");
}




// Strings

if ( !String.prototype.trim ) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	}
}

if ( !String.prototype.toCamelCase ) {
	String.prototype.toCamelCase = function() {
		return this.replace(/(\-[a-z])/g, function($1) { return $1.toUpperCase().replace('-',''); } );
	}
}

if ( !String.prototype.capitalize ) {
	String.prototype.capitalize = function() {
		return this.toLowerCase().replace(/([^a-z])([a-z])(?=[a-z]{2})|^([a-z])/g, function(_, g1, g2, g3) {
	    return (typeof g1 === 'undefined') ? g3.toUpperCase() : g1 + g2.toUpperCase();
	  });
	}
}

if ( !String.prototype.boolean ) {
	String.prototype.boolean = function() {
		return (/^true$/i).test(this);
	}
}

if ( !String.prototype.friendly ) {
	String.prototype.friendly = function() {
		return this.toLowerCase().replace(/&amp;/g, '&').replace(/[^\w\-\!\$\'\(\)\=\@\d_]+/g, "-").replace(/\-{2,}/g, "-").replace(/\-$/g, "");
	}
}

if ( !String.prototype.has ) {
	String.prototype.has = function(string) {
		return this.indexOf(string) > -1;
	}
}