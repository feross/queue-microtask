# queue-microtask [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/queue-microtask/master.svg
[travis-url]: https://travis-ci.org/feross/queue-microtask
[npm-image]: https://img.shields.io/npm/v/queue-microtask.svg
[npm-url]: https://npmjs.org/package/queue-microtask
[downloads-image]: https://img.shields.io/npm/dm/queue-microtask.svg
[downloads-url]: https://npmjs.org/package/queue-microtask
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### fast, tiny `queueMicrotask` shim for modern engines

- No dependencies. Less than 10 lines. No shims or complicated fallbacks.
- Use `queueMicrotask` safely in all JS engines
- Fallback to `process.nextTick` in Node.js 10 and earlier
- Fallback to `setTimeout` in old browsers

## install

```
npm install queue-microtask
```

## usage

```js
const queueMicrotask = require('queue-microtask')

queueMicrotask(() => { /* this will run soon */ })
```

## What is the `queueMicrotask` function?

The `queueMicrotask` function queues a microtask to be executed prior to control returning to the event loop. It is analogous to Node's [`process.nextTick`](https://nodejs.org/api/process.html#process_process_nexttick_callback_args).

A microtask is a short function which will run after the current task has completed its work and when there is no other code waiting to be run before control of the execution context is returned to the event loop.

This lets your code run without interfering with any other, potentially higher priority, code that is pending, but before the JS engine regains control over the execution context, potentially depending on work you need to complete.

See the [spec](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing) or [Node documentation](https://nodejs.org/api/globals.html#globals_queuemicrotask_callback) for more information.

## Who is this package for?

This package allows you to use `queueMicrotask` safely in all JS engines. Use it if you prioritize small JS bundle size over optimal performance in old browsers.

## Why not use `process.nextTick`?

In Node, `queueMicrotask` and `process.nextTick` are [essentially equivalent](https://nodejs.org/api/globals.html#globals_queuemicrotask_callback). If you just need to support Node 10+, you can use `queueMicrotask` directly. If you need to support all versions of Node, you can use `process.nextTick`.

If you also need browser support, read on.

## Why not use `setTimeout(fn, 0)`?

This approach is the most compatible, but it has many problems. Modern browsers throttle timers severely, so `setTimeout(…, 0)` usually takes at least 4ms to run. If you have many `setTimeout` calls, then this can severely limit the performance of your program.

## Why not use a microtask library like [`immediate`](https://github.com/calvinmetcalf/immediate) or [`asap`](https://www.npmjs.com/package/asap)?

These packages are great! However, if you prioritize small JS bundle size over optimal performance in old browsers then you may want to consider this package.

This package (`queue-microtask`) is four times smaller than `immediate`, twice as small as `asap`, and twice as small as using `process.nextTick` and letting the browser bundler shim it automatically.

Note: This package does not have proper microtask support in old browsers. Instead, old browsers fallback to `setTimeout`. This will be slower, but it allows us to avoid include a complicated solution.

Since the `queueMicrotask` API is supported in Chrome, Firefox, Safari, Opera, and Edge (canary), **the vast majority of users will get the optimal experience**. Node users also always get the optimal experience since Node 12 has `queueMicrotask` and older versions have `process.nextTick`, which has equivalent performance to `queueMicrotask`.

If you need optimal performance in old browsers, use one of the alternative packages.

## What is a shim?

> In computer programming, a shim is a library that transparently intercepts API calls and changes the arguments passed, handles the operation itself or redirects the operation elsewhere. – [Wikipedia](https://en.wikipedia.org/wiki/Shim_(computing))

This package could also be described as a "ponyfill".

> A ponyfill is almost the same as a polyfill, but not quite. Instead of patching functionality for older browsers, a ponyfill provides that functionality as a standalone module you can use. – [PonyFoo](https://ponyfoo.com/articles/polyfills-or-ponyfills)

## API

### `queueMicrotask(fn)`

The `queueMicrotask()` method queues a microtask.

The `fn` argument is a function to be executed after all pending tasks have completed but before yielding control to the browser's event loop.

## license

MIT. Copyright (c) [Feross Aboukhadijeh](https://feross.org).
