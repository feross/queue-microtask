const test = require('tape')
const queueMicrotask = require('../')

test('basic test', t => {
  t.plan(1)
  queueMicrotask(() => t.pass('function was called'))
})

test('ensure correct ordering', t => {
  t.plan(3)

  let order = 0

  queueMicrotask(() => {
    t.equal(++order, 1)
    queueMicrotask(() => t.equal(++order, 2))
  })

  setTimeout(() => t.equal(++order, 3), 0)
})

test('error handling', t => {
  t.plan(2)

  process.on('uncaughtException', onUncaughtException)

  function onUncaughtException (err) {
    t.equal(err.message, 'some error')
    process.off('uncaughtException', onUncaughtException)
  }

  queueMicrotask(() => {
    t.pass('function called')
    throw new Error('some error')
  })
})
