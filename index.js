let resolvedPromise

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : (typeof Promise === 'function' ? (resolvedPromise = Promise.resolve()) : false)
    ? cb => resolvedPromise
      .then(cb)
      .catch(err => setTimeout(() => { throw err }, 0))
    : cb => setTimeout(cb, 0)
