/** @license ISC License (c) copyright 2016 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const isFunction = require('../internal/isFunction')
const isType = require('../internal/isType')

const _inspect = require('../funcs/inspect')

const identity = require('../combinators/identity')
const constant = require('../combinators/constant')
const compose = require('../funcs/compose')

const Pair = require('./Pair')

const _type =
  constant('Arrow')

const _empty =
  () => Arrow(identity)

function Arrow(runWith) {
  if(!isFunction(runWith)) {
    throw new TypeError('Arrow: Function required')
  }

  const type =
    _type

  const empty =
    _empty

  const value =
    constant(runWith)

  const inspect =
    constant(`Arrow${_inspect(value())}`)

  function concat(m) {
    if(!(m && isType(type(), m))) {
      throw new TypeError('Arrow.concat: Arrow required')
    }

    return map(m.runWith)
  }

  function map(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Arrow.map: Function required')
    }

    return Arrow(compose(fn, runWith))
  }

  function contramap(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Arrow.contramap: Function required')
    }

    return Arrow(compose(runWith, fn))
  }

  function promap(l, r) {
    if(!isFunction(l) || !isFunction(r)) {
      throw new TypeError('Arrow.promap: Functions required for both arguments')
    }

    return Arrow(compose(r, runWith, l))
  }

  function branch() {
    return Arrow(x => Pair(x, x))
  }

  function merge(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Arrow.merge: Binary function required')
    }

    return Arrow(function(x) {
      if(!(x && x.type && x.type() === Pair.type())) {
        throw TypeError('Arrow.merge: Pair required for inner argument')
      }

      return fn(x.fst(), x.snd())
    })
  }

  return {
    inspect, type, value, runWith,
    concat, empty, map, contramap,
    promap, branch, merge
  }
}

Arrow.empty = _empty
Arrow.type = _type

Arrow.concat =
  require('../pointfree/concat')

Arrow.value =
  require('../pointfree/value')

Arrow.runWith =
  require('../pointfree/runWith')

Arrow.map =
  require('../pointfree/map')

Arrow.contramap =
  require('../pointfree/contramap')

Arrow.promap =
  require('../pointfree/promap')

Arrow.branch =
  require('../pointfree/branch')

Arrow.merge =
  require('../pointfree/merge')

module.exports = Arrow