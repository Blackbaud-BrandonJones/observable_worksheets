// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: Subscribe to `data$` using three callbacks and log out all values to console.
// be sure to log errors and completions as well.

// if you do not pass it an error handler callback, it will syncronously throw the error at the end  in rx5,  in rx6 it will go to a process on error and show up in the console.

// callback, err, done 
data$.subscribe(
  data => console.log(data),
  err =>  console.warn(err),
  () => console.info('done')
);

