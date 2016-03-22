// ## UMD.js wrapper.
(function (root, factory) {
    // AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore','jquery','backbone'], function (_, $, Backbone) {
        return factory(_, $, Backbone);
    });
    // Commonjs.
  } else if(typeof exports !== 'undefined'){
    var
      _ = require('underscore'),
      $ = require('jquery'),
      Backbone = require('backbone')
    ;

    exports = module.exports = factory(_, $, Backbone);
    // Browser globals.
  } else {
    factory(_, $, Backbone);
  }
}(this, function (_, $, Backbone) {
'use strict';

  var _inst, _store = {}, Dispatcher = function Dispatcher() {};

  _.extend(Dispatcher.prototype, Backbone.Events, {

  on: function(name, callback, context){
    if(!_store[name]){
      _store[name] = {};
    }
    Backbone.Events.on.apply(this, arguments);
    if(_store[name] === true){
      Backbone.Events.trigger.apply(this, [name]);
    }
  },

  trigger: function(name){
    if(!_store[name]){
      _store[name] = true;
    }
    Backbone.Events.trigger.apply(this, arguments);
  },


  once: function(name, callback, context){
    if(!_store[name]){
      _store[name] = {};
    }
    Backbone.Events.once.apply(this, arguments);

    if(_store[name] === true){
      Backbone.Events.trigger.apply(this, [name]);
    }
  }



  });

// Singleton
  Backbone.Dispatcher = _inst ? _inst : (_inst = new Dispatcher());

return Backbone.Dispatcher;

}));
