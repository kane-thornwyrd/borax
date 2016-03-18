inside = (what, from)=>
  if typeof window isnt 'undefined'
    window[what] = from
  else
    global[what] = from
we = (obj)-> obj
load = (thing)=> inside thing, we require thing

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

inside 'sinonChai', we require 'sinon-chai'

inside '_', we require 'underscore'
inside '$', we require 'jquery'
inside 'Backbone', we require 'backbone'

require '../lib/borax.min'

load 'sinon'

load('chai').should()

chai.use sinonChai

describe 'The Dispatcher', ->

  it 'should be always the same instance !', ->
    Backbone.Dispatcher.should.be.equal Backbone.Dispatcher

  it 'should allow to register callbacks and trigger events', ->
    spy = sinon.spy()
    Backbone.Dispatcher.on('test', spy).should.be.equal Backbone.Dispatcher
    Backbone.Dispatcher.trigger 'test'
    spy.should.have.been.called
