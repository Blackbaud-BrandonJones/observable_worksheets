// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: Subscribe to `data$` and log out all values to console.


// NOTE: If `forEach` returns a promise, how an we unsubscribe?
//   We can't (yet! perhaps in the future of Rx?)

data.subscribe({
  next(val) {
    // this has no where to go unless it's in a try catch
    throw new Error('bad');
  }
})

// forces async behavior.

// here the error gets handled by the promise, so a .catch();

// not relevant now, but a proposal is to add an abort signal parameter to forEach.
data$.forEach(v => console.log(v))
  .then(
    () => console.log('done'),
    err => console.error(err)
  );

  // this let's us handle our concurrant stuff with a promise.
  async function foo() {
    await data$.forEach(x => doAThing(x));
  }