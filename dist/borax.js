(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable"], factory);
	else if(typeof exports === 'object')
		exports["Borax"] = factory(require("immutable"));
	else
		root["Borax"] = factory(root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _datastore = __webpack_require__(1),
	    _datastore2 = _interopRequireDefault(_datastore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	global.Borax = module.exports = {
	  Datastore: _datastore2.default
	}; // # Borax #
	//
	// another kind of flux !
	//
	// Check the "Jump to ..." menu above &#x2197;
	//
	//
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()) || Function('return this')()))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _immutable = __webpack_require__(2),
	    _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // # Datastore


	// Let's assume that 100 entries are enougth history...
	var HISTORY_MAX_LENGTH = 100,
	    _inst = void 0;
	// Small static to save the singleton instance.

	var Datastore = function () {
	  function Datastore() {
	    _classCallCheck(this, Datastore);

	    // That's the heart of the beast: an array of immutables !
	    this.history = [_immutable2.default.Map()];
	    this.reducers = {};
	    this.cbs = [];
	  }

	  // ## registerReducer
	  // Register a reducer
	  // * **@param**  {String} name of the reducer, incidentally also the name of the
	  // data it will reduce from the state.
	  // * **@param**  {Function} cb for the reducer.
	  // * **@chainable**
	  //
	  // ```js
	  //  require('borax').Datastore.registerReducer('foo',(state = {}, action)=>{
	  //    switch(action.type){
	  //      case 'START':
	  //        return {start: Date.now()};
	  //      case 'END':
	  //        return {end: Date.now()};
	  //      case 'RETRIEVED':
	  //        return {data: data.message};
	  //      default:
	  //        return state;
	  //  });
	  // ```


	  Datastore.prototype.registerReducer = function registerReducer(name, cb) {
	    this.reducers[name] = cb;
	    return this;
	  };

	  // ## getState
	  // Browse the state history
	  // * **@param**  {Number} away (optionnal) how far from the latest, default: 0
	  // * **@return** {Immutable.Map}      The state requested.
	  //
	  // ```js
	  //  let { Datastore } = require('borax');
	  //
	  //  let currentState = Datastore.getState();
	  //
	  //  let antepenultimateState = Datastore.getState(2);
	  // ```


	  Datastore.prototype.getState = function getState() {
	    var away = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    return this.history[this.history.length - 1 - away];
	  };

	  // ## dispatch
	  // Call all the reducers for them to alter the app state then forge the new one.
	  //
	  // Also garbage collect the history to avoid pseudo-"memory leak".
	  //
	  // * **@param**  {Object} action [description]
	  // * **@chainable**
	  //
	  // ```js
	  //  let { Datastore } = require('borax');
	  //
	  //  $.ajax('exemple.com/data.json')
	  //    .then((data)=>{
	  //      Datastore.dispatch(
	  //        require('../actions/foo/dataRetrieved')(data)
	  //      );
	  //    })
	  //  ;
	  // ```


	  Datastore.prototype.dispatch = function dispatch(action) {
	    var _this = this,
	        latestState = this.getState();
	    // Good exemple of getState use !


	    //Obviously we push a new state to the history.
	    this.history.push(
	    // We won't create a new state for each reducer called this way.
	    latestState.withMutations(function (list) {
	      for (var name in _this.reducers) {

	        var latest = latestState.get(name) ? latestState.get(name).toJS() : {};

	        list.set(name, _immutable2.default.Map(_extends(latest, _this.reducers[name](latestState.get(name), action))));
	      }
	    }));

	    // Here's the primitive garbage collector.
	    if (this.history.length > HISTORY_MAX_LENGTH) this.history.shift();

	    return this.trigger();
	  };

	  // ## onNewstate
	  // Register a listener to the event of a new state being created.
	  //
	  // * **@param**  {Function} cb to register as listener.
	  // * **@return** {Number}      id from the new listener.
	  //
	  // ```js
	  //  //@ToDo
	  // ```


	  Datastore.prototype.onNewstate = function onNewstate(cb) {
	    var id = this.cbs.length;
	    this.cbs.push(cb);
	    return id;
	  };

	  // ## offNewstate
	  // Unregister a listener.
	  //
	  // * **@param**  {Number}  id from the callback to remove.
	  // * **@return** {Number}  new listener's array length.
	  //
	  // ```js
	  //  //@ToDo
	  // ```


	  Datastore.prototype.offNewState = function offNewState(id) {
	    if (this.cbs.length - 1 < id) this.cbs.splice(id, 1);
	    return this.cbs.length;
	  };

	  /**
	   * Used internally to trigger all the listeners.
	   * @chainable
	   */


	  Datastore.prototype.trigger = function trigger() {
	    var state = this.getState(),
	        notify = function notify(cb) {
	      return cb(state);
	    };

	    this.cbs.every(notify);
	    return this;
	  };

	  return Datastore;
	}();

	module.exports = _inst = _inst ? _inst : new Datastore();

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;