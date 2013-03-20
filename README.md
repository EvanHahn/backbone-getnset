Backbone.js model getters and setters
=====================================

A tiny getters and setters plugin for [Backbone.js](http://documentcloud.github.com/backbone). Originally taken from [backbone.getters.setters](https://github.com/berzniz/backbone.getters.setters).

The plugin is tested with Backbone version 1.0.0.

## Getting started

Include Backbone (and Underscore) in your page _before_ including this plugin.

    <script src="underscore.js"></script>
    <script src="backbone.js"></script>
    <script src="backbone.getnset.js"></script>

### RequireJS

Include [RequireJS](http://requirejs.org) and configure it as normal, e.g.:

```javascript
require.config({
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        getnset: "lib/backbone.getnset"
    }
});
```

Define your model and include getnset as a dependency:
```javascript
define("someModel", ["getnset"], function() {
    return Backbone.Model.extend({
        // see next sections for configuration
    });
});
```

### Configuring getters

Configure your getters by adding a getter function for each attribute:

```js
var MyModel = Backbone.Model.extend({
    getters: {
        fullName: function() {
            return this.get("firstName") + " " + this.get("lastName");
        }
    },
    defaults: {
        firstName: "James",
        lastName: "Dean"
    }
});
```

Then simply call the regular get method:

```js
var someModel = new MyModel();
someModel.get("fullName");  // => "James Dean"
```

### Configuring setters

Configure your setters by adding a setter function for each attribute:

```js
var MyModel = Backbone.Model.extend({
    setters: {
        firstName: function(value) {
            return value.toUpperCase();
        },
        lastName: function(value) {
            return value.toLowerCase();
        }
    },
    defaults: {
        firstName: "Lady",
        lastName: "Gaga"
    }
});
```

In the above example, the setters were already called by the defaults hash. The value of `firstName` is now `"LADY"` and the value of `lastName` is now `"gaga"`.

You can also call the `set` method as usual:

```js
someModel.set("firstName", "letters");
```

And now the value of `firstName` is `"LETTERS"`.

You can also set multiple attributes too.

```js
someModel.set({
    firstName: "everything",
    lastName: "NUMBERS"
});
```

Enjoy!


## Licensing

This is licensed under the MIT License.
