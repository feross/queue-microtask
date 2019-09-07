module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof Promise === 'function'
    ? cb => Promise.resolve().then(cb)
    : cb => setTimeout(cb, 0) // fallback for Node 10 and old browsers
