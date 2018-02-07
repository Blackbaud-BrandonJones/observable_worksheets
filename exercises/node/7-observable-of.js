const Rx = require('rxjs/Rx');

// in angular import { of } from 'rxjs/observable/of';

// Destructure to not require the whole thing.
const { Observable } = Rx;
const { of } = Observable

// same place as a promise if you pass it to the final argument of the of, makes it async.
// const { asap } = Rx.Scheduler;
// Schedulers are uncommon, there are some for like animations that are cool, but rarely used.
//TODO: create an observable of 'foo', 'bar' and 'baz' with `Observable.of`

// can use scheduler to make this async.
const source$ = of('foo', 'bar', 'baz')//, asap);

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
  foo
  bar
  baz
  done
  stop
*/

// Notice the output is _synchronous_!!
