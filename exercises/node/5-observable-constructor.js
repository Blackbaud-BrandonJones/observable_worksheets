const Rx = require('rxjs/Rx');
const { Observable } = Rx;
// TODO: create an observable with the Observable constructor that
// emits the values 1, 2, 3 and completes.

// this function you pass in, is the Observable.
const source$ = new Observable(subscriber => {

  // [1,2,3].forEach(x => subscriber.next(x));
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  // if you do not call complete inside this method, it will never call the last complete/final method in your subscriber.  ie. will never log 'done' without it.
  subscriber.complete();
}); //<-- set me!

// totally syncronously.
console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');