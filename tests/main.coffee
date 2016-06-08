getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

global.Immutable = require 'immutable'
borax = require '../lib/borax'

sinon = require 'sinon'
sinonChai = require 'sinon-chai'
chai = require 'chai'

chai.should()
chai.use sinonChai

console.log Borax.Datastore.getState()

describe 'The test environment', ->
  it 'should work', ->
    true.should.be.equal true

describe 'The Datastore', ->
  it 'should exist', ->
    Borax.should.have.property('Datastore')

  it 'should have a getState method', ->
    Borax.Datastore.should.have.property('getState')
    Borax.Datastore.getState.should.be.a('function')

  it 'should have a getState method that return an Immutable.Map', ->
    Borax.Datastore.getState().should.be.an.instanceof(Immutable.Map)

  it 'should have a getState method that return an empty Immutable.Map', ->
    Borax.Datastore.getState().size.should.be.equal(0)


  # it 'should be always the same instance !', ->
  #   Backbone.Dispatcher.should.be.deep.equal Backbone.Dispatcher

  # it 'should allow to register callbacks and trigger events', ->
  #   spy = sinon.spy()
  #   Backbone.Dispatcher.on 'test', spy
  #   Backbone.Dispatcher.trigger 'test'
  #   spy.should.have.been.called


  # it 'should allow to register callbacks and trigger events in any order toward the triggering', ->
  #   spy2 = sinon.spy()
  #   Backbone.Dispatcher.trigger 'test2'
  #   Backbone.Dispatcher.on('test2', spy2)
  #   spy2.should.have.been.called

  # it 'should allow to register callbacks using once in any order toward the triggering', ->
  #   spy3 = sinon.spy()
  #   Backbone.Dispatcher.trigger 'test3'
  #   Backbone.Dispatcher.once('test3', spy3)
  #   Backbone.Dispatcher.trigger 'test3'
  #   Backbone.Dispatcher.trigger 'test3'
  #   spy3.should.have.been.callCount 1
