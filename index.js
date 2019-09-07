module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof Promise === 'function'
    ? function (cb) { return Promise.resolve().then(cb) }
    : function (cb) { return setTimeout(cb, 0) } // fallback for Node 10 and old browsers
