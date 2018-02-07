const noisyUnsubscriber = require('./fixtures/22-noisy-unsubscriber');
const { timer } = require('rxjs/observable/timer');
const { merge } = require('rxjs/observable/merge');
const { takeUntil } = require('rxjs/operators');

// NOTE: Setup
const sourceA$ = noisyUnsubscriber('a');
const sourceB$ = noisyUnsubscriber('b');
const sourceC$ = noisyUnsubscriber('c');

/** TODO:
  using only a *single* subscribe call:

  1. subscribe to all three sources (`sourceA$`, `sourceB$`, `sourceC$`), and
     log their values to console.
  2. unsubscribe from `sourceA$` after 900ms
  3. unsubscribe from the other two after 1300ms
*/
merge(
  sourceA$.pipe(takeUntil(timer(900))),
  sourceB$,
  sourceC$
)
.pipe(
  takeUntil(timer(1300))
)
.subscribe(
  x => console.log(x)
);
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

/** 
 * // It's overkill to kill the killer$. since it gets garbage collected with the component as it's a property of the component.
 * class Comp {
 *  killer$ = new Subject();
 * 
 *  data$ = this.dataSvc.getDataStream()
 *    .pipe(
 *      takeUntil(this.killer$)
 *    )
 * 
 * ngOnDestroy() {
 * // whenever you next into this observable it kills the takeUntil and causes the complete method on the observable
 *  this.killer$.next();
 * }
 * }
 */