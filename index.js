module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof Promise === 'function'
    ? cb => Promise.resolve()
      .then(cb)
      .catch(err => setTimeout(() => { throw err }, 0))
    : cb => setTimeout(cb, 0)
