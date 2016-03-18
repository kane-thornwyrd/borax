inside = (what, from)=>
  if typeof window isnt 'undefined'
    window[what] = from
  else
    global[what] = from
we = (obj)-> obj
load = (thing)=> inside thing, we require thing

getARandomString = -> Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')

inside 'sinonChai', we require 'sinon-chai'

require '../lib/borax.min'

load 'sinon'

load('chai').should()

chai.use sinonChai
