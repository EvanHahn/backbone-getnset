/*
 * Backbone model getters and setters
 * lovingly made by Evan Hahn
 * License: MIT
 * http://git.io/ldKjrQ
 */

;(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(["underscore","backbone"], function(_, Backbone) {
			return factory(_ || root._, Backbone || root.Backbone);
		});
	} else {
		factory(_, Backbone);
	}
}(this, function(_, Backbone) {

	var oldGet = Backbone.Model.prototype.get;
	var oldSet = Backbone.Model.prototype.set;

	_.extend(Backbone.Model.prototype, {

		getters: {},
		setters: {},

		get: function(attr) {
			if (_.isFunction(this.getters[attr])) {
				return this.getters[attr].call(this);
			}
			return oldGet.call(this, attr);
		},

		set: function(key, value, options) {
			var attrs, attr;
			if (_.isObject(key) || key == null) {
				attrs = key;
				options = value;
			} else {
				attrs = {};
				attrs[key] = value;
			}
			for (attr in attrs) {
				if (_.isFunction(this.setters[attr])) {
					attrs[attr] = this.setters[attr].call(this, attrs[attr]);
				}
			}
			return oldSet.call(this, attrs, options);
		}

	});

}));
