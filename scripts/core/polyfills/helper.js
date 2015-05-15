// IE8 Fixes

window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;

if( typeof String.prototype.trim !== 'function' ) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = 0, len = this.length; i < len; i++) {
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
}




// ECMAScript5

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	}
}

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callbackfn, thisArg) {
		var O = Object(this),
			lenValue = O.length,
			len = lenValue >>> 0,
			T,
			k,
			Pk,
			kPresent,
			kValue;

		if (typeof callbackfn !== 'function') {
			throw new TypeError();
		}

		T = thisArg ? thisArg : undefined;

		k = 0;
		while (k < len) {
			Pk = k.toString();
			kPresent = O.hasOwnProperty(Pk);
			if (kPresent) {
				kValue = O[Pk];
				callbackfn.call(T, kValue, k, O);
			}
			k += 1;
		}
		return undefined;
	};
}




// Animation Frame

var initAnimationFrame = function() {
	var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; x++ ) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( !window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}




// Arrays

// Single

Array.prototype.clean = function(deleteValue) { // Delete empty values
	for ( var i = 0; i < this.length; i++ ) {
		if ( this[i] == deleteValue ) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
}

Array.prototype.uniques = function() { // Gather duplicate values
	return this.reduce(function(a, b){
		if ( a.indexOf(b) < 0 ) a.push(b);
		return a;
	}, []);
}

Array.prototype.contains = function(v) { // Contains specified value
	for ( var i = 0; i < this.length; i++ ) {
		if (this[i] === v)	return true;
	}
	return false;
}

Array.prototype.duplicates = function() { // Gather duplicate values
	var arrayLength = this.length, i, j, result = [];
	for (i = 0; i < arrayLength; i++) {
		for (j = 0; j < arrayLength; j++) {
			if (this[i] == this[j] && i != j && !result.contains(this[i])) {
				result.push(this[i]);
			}
		}
	}
	return result;
}

Array.prototype.reduce = function() { // Join all internal arrays
	var a = [];
	for (var i=0; i < this.length; i++) {
		for (var j=0; j < this[i].length; j++) {
			a.push(this[i][j]);
		}
	}
	return a;
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
	};
}

String.prototype.toCamelCase = function() {
	return this.replace(/(\-[a-z])/g, function($1) { return $1.toUpperCase().replace('-',''); } );
}

String.prototype.bool = function() {
    return (/^true$/i).test(this);
}