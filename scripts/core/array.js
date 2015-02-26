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




Array.prototype.uniques = function() { // Single: Gather unique values
	var r = new Array();
	o:for( var i = 0, n = this.length; i < n; i++ ) {
		for( var x = 0, y = r.length; x < y; x++ ) {
			if( r[x]==this[i] ) {
				alert('this is a DUPE!');
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}
// Array.prototype.duplicates = function duplicates() { // Single: Gather duplicate values
// 	return this.reduce(function(accum, cur) {
// 		if (accum.indexOf(cur) > -1) accum.push(cur);
// 		return accum;
// 	}, []);
// }

// Array.prototype.duplicates = function() { // Single: Gather duplicate values
// 	return this.concat(this);
// };

Array.prototype.duplicates = function() { // Single: Gather duplicate values
	var len = this.length;

	for (var i = 0; i < len; i++) {
		this[len + i] = this[i];
	}

	return this;
}

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