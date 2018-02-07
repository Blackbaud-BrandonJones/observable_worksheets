const Rx = require('rxjs/Rx');

const data = ['apples', 'bananas', 'oranges'];

//TODO: create an observable the `data` array with `Observable.from`

// can take an array and convert it into an observable.  loops over the values and next everything out, then complete.
const source$ = Rx.Observable.from(data);

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
  apples
  bananas
  oranges
  done
  stop
*/

// Notice the output is _synchronous_ again, because arrays are consumed
// synchronously
