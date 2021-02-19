/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise

// globalThis polyfill
(function (Object) {
  if (typeof globalThis === 'object') return
  Object.defineProperty(Object.prototype, '__magic__', {
    get: function () {
      return this
    },
    configurable: true // This makes it possible to `delete` the getter later.
  })
  // eslint-disable-next-line no-undef
  __magic__.globalThis = __magic__
  // eslint-disable-next-line no-undef
  delete Object.prototype.__magic__
}(Object))

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(globalThis)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))
