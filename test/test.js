var expect = require('expect.js');

// this is a hack, I'm so sorry
global._ = require('underscore');
global.Backbone = require('Backbone');

require('../backbone.getnset.js');

describe('plugin', function() {

	var Anchorman = Backbone.Model.extend({

		defaults: {
			firstName: 'Ron',
			lastName: 'Burgundy',
			age: 69,
			suitColor: 'purple'
		},

		getters: {
			fullName: function() {
				return this.get('firstName') + ' ' + this.get('lastName');
			}
		},

		setters: {
			age: function(value) {
				return Math.max(0, value);
			}
		}

	});

	var ron = new Anchorman;

	it('allows normal getters', function() {
		expect(ron.get('firstName')).eql('Ron');
		expect(ron.get('age')).eql(69);
		expect(ron.get('suitColor')).eql('purple');
	});

	it('allows custom getters', function() {
		expect(ron.get('fullName')).eql('Ron Burgundy');
	});

	it('allows normal setters', function() {
		ron.set('suitColor', 'red');
		ron.set({
			firstName: 'Brian',
			lastName: 'Fantana'
		})
		expect(ron.get('firstName')).eql('Brian');
		expect(ron.get('lastName')).eql('Fantana');
		expect(ron.get('fullName')).eql('Brian Fantana');
		expect(ron.get('suitColor')).eql('red');
	});

	it('allows custom setters', function() {
		ron.set('age', 420);
		expect(ron.get('age')).eql(420);
		ron.set({ age: -12 });
		expect(ron.get('age')).eql(0);
	});

});