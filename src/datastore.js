// # Datastore
import Immutable from 'immutable';

// Let's assume that 100 entries are enougth history...
const HISTORY_MAX_LENGTH = 100;
// Small static to save the singleton instance.
let _inst;

class Datastore {

  constructor(){
    // That's the heart of the beast: an array of immutables !
    this.history = [Immutable.Map()];
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
  registerReducer(name, cb){
    this.reducers[name] = cb;
    return this;
  }

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
  getState(away = 0){
    return this.history[this.history.length-1-away];
  }

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
  dispatch(action){
    // Good exemple of getState use !
    let latestState = this.getState();

    //Obviously we push a new state to the history.
    this.history.push(
      // We won't create a new state for each reducer called this way.
      latestState.withMutations((list) => {
        for(var name in this.reducers){

          var latest = latestState.get(name) ? latestState.get(name).toJS() : {} ;

          list.set(name, Immutable.Map(Object.assign(latest, this.reducers[name](latestState.get(name), action))));
        }
      })
    );

    // Here's the primitive garbage collector.
    if(this.history.length > HISTORY_MAX_LENGTH) this.history.shift();

    return this.trigger();
  }

  // ## onNewstate
  // Register a listener to the event of a new state being created.
  //
  // * **@param**  {Function} cb to register as listener.
  // * **@return** {Number}      id from the new listener.
  //
  // ```js
  //  //@ToDo
  // ```
  onNewstate(cb){
    let id = this.cbs.length;
    this.cbs.push(cb);
    return id;
  }

  // ## offNewstate
  // Unregister a listener.
  //
  // * **@param**  {Number}  id from the callback to remove.
  // * **@return** {Number}  new listener's array length.
  //
  //  ```js
  //  //@ToDo
  //  ```
  offNewState(id){
    if(this.cbs.length-1 < id) this.cbs.splice(id, 1);
    return this.cbs.length;
  }

  /**
   * Used internally to trigger all the listeners.
   * @chainable
   */
  trigger(){
    let state = this.getState();
    let notify = (cb)=>{
      return cb(state);
    };
    this.cbs.every(notify);
    return this;
  }
}

module.exports = _inst = _inst ? _inst : new Datastore();

