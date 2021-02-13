/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise

function getGlobalObject () {
  if (typeof globalThis === 'object') return globalThis
  if (typeof window !== 'undefined') return window
  return global
}

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(getGlobalObject())
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))
