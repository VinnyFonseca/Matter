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




// Array Manipulation Functions

// Single

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
	}, []);
}

Array.prototype.contains = function(v) { // Single: Contains specified value
	for ( var i = 0; i < this.length; i++ ) {
		if (this[i] === v)	return true;
	}
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

// Multiple

Array.prototype.reduce = function() { // Multiple: join into single
	var a = [];
	for (var i=0; i < this.length; i++) {
		for (var j=0; j < this[i].length; j++) {
			a.push(this[i][j]);
		}
	}
	return a;
};