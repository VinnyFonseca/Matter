// ECMAScript5 Fixes

if ( !Array.prototype.indexOf ) {
	Array.prototype.indexOf = function(obj, start) {
		"use strict";
		for ( var i = (start || 0), j = this.length; i < j; i++ ) {
			if ( this[i] === obj ) { return i; }
		}
		return -1;
	};
}




Array.prototype.clean = function(deleteValue) { // Single: Delete empty values
	for ( var i = 0; i < this.length; i++ ) {
		if ( this[i] == deleteValue ) {
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};




Array.prototype.uniques = function() { // Single: Gather duplicate values
	return this.reduce(function(a, b){
		if ( a.indexOf(b) < 0 ) a.push(b);
		return a;
	},[]);
}

// Array.prototype.duplicates = function() { // Single: Gather duplicate values
// 	return this.reduce(function(a, b){
// 		if ( a.indexOf(b) < 0 ) a.push(b);
// 		return a;
// 	},[]);
// }

Array.prototype.contains = function(k) {
	for ( var p in this) if (this[p] === k)	return true;
	return false;
};

Array.prototype.duplicates = function() { // Single: Gather duplicate values
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

// Array.prototype.duplicates = function duplicates() { // Single: Gather duplicate values
// 	return this.reduce(function(accum, cur) {
// 		if (accum.indexOf(cur) >= 0) accum.push(cur);
// 		return accum;
// 	}, []);
// }

// Array.prototype.duplicates = function() { // Single: Gather duplicate values
// 	return this.concat(this);
// };

// Array.prototype.duplicates = function() { // Single: Gather duplicate values
// 	var len = this.length;

// 	for (var i = 0; i < len; i++) {
// 		this[len + i] = this[i];
// 	}

// 	return this;
// }

// Array.prototype.duplicates = function() { // Single: Gather duplicate values
// 	var r = new Array();
// 	o:for( var i = 0, n = this.length; i < n; i++ ) {
// 		for( var x = 0, y = r.length; x < y; x++ ) {
// 			if( r[x] == this[i] ) {
// 				r[r.length] = this[i];
// 			}
// 		}
// 	}
// 	return r;
// }




$.arrayIntersect = function(a, b) { // Multiple: Compare and gather duplicates
	return $.grep(a, function(i) {
			return $.inArray(i, b) > -1;
	});
};