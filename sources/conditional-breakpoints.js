!function(glob) {

	var Set = function(comparator) {
		this._objs = [];
		this._comparator = comparator || function(val1, val2) {
			if(typeof val1 === 'number') {
				return val1 === val2 ? 0 : val1 < val2 ? -1 : 1;
			} else {
				return (val1+"").localeCompare(val2+""); 
			}
		};
	};

	Set.prototype = {
		add: function(obj, comparator) {
			var i, length = this._objs.length;

			if(!length) {
				this._objs.push(obj);
				return this;
			}

			for(var i = 0; i < length; i++) {
				var val = this._objs[i],
				c = comparator ? comparator(obj, val) : this._comparator(obj, val);

				if(c === 0) return this;

				if(c < 0) {
					this._objs.splice(i, 0, obj); 
					return this;
				}

				if(i === length - 1) {
					this._objs.splice(i+1, 0, obj);
					return this;
				}
			}
		},

		contains: function(obj, comparator) {
			return this._getIndex(obj, comparator) !== -1;
		},

		remove: function(obj, comparator) {
			var i = this._getIndex(obj, comparator);
			if(i >= 0) {
				this._objs.splice(i, 1);
			}
			return this;
		},

		_getIndex: function(obj, comparator) {
			for(var i = 0, length = this._objs.length; i < length; i++) {
				var val = this._objs[i],
				c = comparator ? comparator(obj, val) : this._comparator(obj, val);
				if(!c) return i;
			}

			return -1;
		},

		size: function() {
			return this._objs.length;
		},

		each: function(callback) {
			for(var i = 0, length = this._objs.length; i < length; i++) {
				callback(this._objs[i]);
			}
		}
	};

	glob.Set = Set;

	var stuff = new Set();
	stuff.add(1);
	stuff.add(2);

}(this)