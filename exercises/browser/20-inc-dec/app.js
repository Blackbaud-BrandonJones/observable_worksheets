
  /** NOTE: Setup */
  const inc = document.querySelector('#inc');
  const dec = document.querySelector('#dec');
  const inc10 = document.querySelector('#inc10');
  const output = document.querySelector('output');
  
  /** NOTE: these are different because they're coming from a global */
  const { BehaviorSubject } = Rx;
  const { of, fromEvent } = Rx.Observable;
  const { map, scan } = Rx.operators;

  /** TODO:
    1. update output with incremented and decremented values
    2. start output with value zero

    NOTE: Hint `scan` is a great way to update a state
      without pushing your state to some global scope.
      If you're familiar with Redux, it's going to end up a
      little like that.

    TODO: BONUS - Add a button that increments by 10
  */
  const inc$ = fromEvent(inc, 'click');
  const dec$ = fromEvent(dec, 'click');
  const inc10$ = fromEvent(inc10, 'click');

  const subject = new BehaviorSubject('INIT');

  inc$.pipe(
    map(() => 'INC')
  ).subscribe(subject);

  dec$.pipe(
    map(() => 'DEC')
  ).subscribe(subject);

  inc10$.pipe(
    map(() => 'INC10')
  ).subscribe(subject);

  const value$ = subject.pipe(
    scan((acc, type) => {
      switch (type) {
        case 'INC':
          return acc + 1;
          break;
        case 'DEC':
          return acc -1;
          break;
        case 'INC10':
          return acc + 10;
          break;
        default:
          return acc;
      }
    }, 0)
  );

  value$.subscribe(value => output.innerText = value);

