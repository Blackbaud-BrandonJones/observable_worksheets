const { Subscription } = require('rxjs/Subscription');
const noisyUnsubscriber = require('./fixtures/22-noisy-unsubscriber');

// NOTE: Setup
const sourceA$ = noisyUnsubscriber('a');
const sourceB$ = noisyUnsubscriber('b');
const sourceC$ = noisyUnsubscriber('c');

// we're going to clean these subscriptions up on a timer (later)
const subA = sourceA$.subscribe(x => console.log(x));
const subB = sourceB$.subscribe(x => console.log(x));
const subC = sourceC$.subscribe(x => console.log(x));

// TODO: manage subscriptions by building a single parent subscription
const subscription = new Subscription();

// do not chain the adds, will add C as child of B and B as child of A etc... which is bad.
subscription.add(subA);
subscription.add(subB);
subscription.add(subC);

setTimeout(() => {
  // TODO: unsubscribe from `subA` so that it's removed from your
  //       parent subscription
  subA.unsubscribe();
}, 900);

setTimeout(() => {
  // TODO: unsubscribe from all remaining subscriptions (`subB` and `subC`)
  //       using a single parent subscription
  subscription.unsubscribe();
}, 1300);

/**
  NOTE: expected output
  a: 0
  b: 0
  c: 0
  a: 1
  b: 1
  c: 1
  a: 2
  b: 2
  c: 2
  a: 3
  b: 3
  c: 3
  a unsubscribed
  b: 4
  c: 4
  b: 5
  c: 5
  b unsubscribed
  c unsubscribed
*/
/*
angular method: example
 class Comp {
  subscription = new Subscription() 
  ngOnInit() {
    this.subscription.add(
      whatever$.subscription()
    )
    this.subscription.add(
      whatever2$.subscription()
    )
    this.subscription.add(
      whatever3$.subscription()
    )
    this.subscription.add(
      whatever4$.subscription()
    )
   }

   ngOnDestroy() {
     // mass unsubscribes
     this.subscription.unsubscribe();
   }
 }
*/
