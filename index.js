module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof Promise === 'function'
    ? cb => Promise.resolve().then(cb)
    : cb => setTimeout(cb, 0)
