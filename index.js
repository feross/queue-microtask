module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof module === 'object'
    // `global` prefix prevents browser bundlers from including `process` shim
    ? cb => global.process.nextTick(cb)
    : cb => setTimeout(cb, 0) // fallback for Node 10 and old browsers
