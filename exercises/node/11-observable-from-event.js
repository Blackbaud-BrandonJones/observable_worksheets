const Rx = require('rxjs/Rx');
const Resource = require('./fixtures/6-Resource');

// less likely to be used in Angular.

// TODO: create an observable with the `Observable.fromEvent` over the same
// `Resource` we used in exercise 6.

/**
NOTE: `Resource` usage:

const resource = new Resource(); // start the resource;
resource.addEventListener('data', handler); // listen for data events
resource.removeEventListener('data', handler); // stop listening for data events

HINT: You'll probably have to create the `Resource` first.
*/
const resource = new Resource();

// this is a hot observable, vs a cold observable
// cold observable creates the thing that makes data for you when you subscribe,  hot observable sort of "wraps" the thing // already created.
const source$ = Rx.Observable.fromEvent(resource, 'data');

const subscription = source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

setTimeout(() => subscription.unsubscribe(), 2100);

/**
NOTE: output should be:

Resource: started
Resource: event listener added
0
1
2
3
Resource: event listener removed
Resource: closed
*/
