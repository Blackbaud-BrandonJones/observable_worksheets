const data$ = require('./fixtures/13-data');

/** TODO:
  1. Take the odd numbers from the observable `data$`,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
  4. Log the result
  5. Try using the pipeable operators from `rxjs/operators`!
*/

// const pipe = (...fns) => (x) => fn.reduce((prev, fn) => fn(prev), x);

// pipe(
//   x => x + x,
//   x => x + '!'
// )(2); // outputs '4!';


// looks something like this, its an operator that is a function that returns a new observable.
// Observable.prototype.map = (fn) => {
//   return new Observable(
//     subscriber => {
//       return this.subscribe({
//         next(vale) { subscriber.next(fn(value)); },
//         error(err) { scubsriber.error(err) },
//         complete() { subscriber.complete(); }
//       })
//     }
//   )
// }

// biggest difference here is that the values go through one a time, running through each step, instead of completing each step for all items before moving on.
data$.filter((val) => {
    console.log('filter', val);
    return val % 2 !== 0;
  })
  .map((val) => {
    console.log('map', val);
    return val * 2;
  })
  .reduce((acc, val) => {
    console.log('reduce', acc, ' ', val)
    return acc + val;
  }, 0)
  .subscribe(val => console.log(val));
/**
  NOTE: expected output
  50
*/

// using pipe:
// import { map, filter, reduce} from 'rxjs/operators';
/*
makes it easier to build your own operators.  i.e

const doItTwice = (fn) => pipe(
  map(fn),
  map(fn)
)
data$.pipe(
  doItTwice(x => x + x),
  filter((val) => {
    console.log('filter', val);
    return val % 2 !== 0;
  }),
  map((val) => {
    console.log('map', val);
    return val * 2;
  }),
  reduce((acc, val) => {
    console.log('reduce', acc, ' ', val)
    return acc + val;
  }, 0)
)
  .subscribe(val => console.log(val));

*/

//TODO: try replacing `reduce` with `scan`!


