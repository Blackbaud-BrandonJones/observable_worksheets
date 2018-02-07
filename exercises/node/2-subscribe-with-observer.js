// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: create an observer to subscribe to `data$` and log out all values.

const observer  = {
  next(val) {
    console.log(val);
  },
  error(err) {
    console.log(err);
  },
  complete() {
    console.log('done');
  }
}

data$.subscribe(observer);

// can subscribe to just a thing.

// data$.subscribe({
// error(err) { console.warn(err); }
// })

// data$.subscribe(null, doErrThing) <- less readable.