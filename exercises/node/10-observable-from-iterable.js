const Rx = require('rxjs/Rx');

// an Iterable is just an object with a next method on it that returns an object with a done value and a value.
// converts an iterable to an observable.
// This is a run-of-the mill iterable. It could be from a generator or anything
// that supports the iterable interface.
const iterable = require('./fixtures/10-iterable');

// iterables can be looped over syncronously.
const source$ = Rx.Observable.from(iterable);

console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');

/**
  NOTE: expected output
  start
  0
  1
  2
  3
  4
  5
  done
  stop
*/

// Notice the output is _synchronous_, because iterators can be pulled from
// synchronously

// NOTE: Bonus/gotcha... Strings are iterables in JavaScript. Try it out.
