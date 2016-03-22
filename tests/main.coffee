inside = (what, from)=>
  if typeof window isnt 'undefined'
    window[what] = from
  else
    global[what] = from
we = (obj)-> obj
load = (thing)=> inside thing, we require thing

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

inside 'sinonChai', we require 'sinon-chai'

require 'bluebird'

inside '_', we require 'underscore'
inside '$', we require 'jquery'
inside 'Backbone', we require 'backbone'

require '../lib/borax.min'

load 'sinon'

load('chai').should()

chai.use sinonChai

describe 'The Dispatcher', ->

  it 'should be always the same instance !', ->
    Backbone.Dispatcher.should.be.deep.equal Backbone.Dispatcher

  it 'should allow to register callbacks and trigger events', ->
    spy = sinon.spy()
    Backbone.Dispatcher.on 'test', spy
    Backbone.Dispatcher.trigger 'test'
    spy.should.have.been.called


  it 'should allow to register callbacks and trigger events in any order toward the triggering', ->
    spy2 = sinon.spy()
    Backbone.Dispatcher.trigger 'test2'
    Backbone.Dispatcher.on('test2', spy2)
    spy2.should.have.been.called

  it 'should allow to register callbacks using once in any order toward the triggering', ->
    spy3 = sinon.spy()
    Backbone.Dispatcher.trigger 'test3'
    Backbone.Dispatcher.once('test3', spy3)
    Backbone.Dispatcher.trigger 'test3'
    Backbone.Dispatcher.trigger 'test3'
    spy3.should.have.been.callCount 1
