// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: Get the subscription and unsubscribe it after 1 second

// 3 

const subscription = data$.subscribe({
  next(val) {
    console.log(val);
  },
  complete() {
    console.log('done');
  }
});

setTimeout(() => {
  subscription.unsubscribe();
}, 1000);

// takeUntil takeWhile
//

/*
bad idea, since the alive doesn't get checked until http gets called
this.alive = true;
this.subscript = this.http.get(url)
  .takeWhile(alive)
  .subscribe();

  ngOnDestroy() {
    this.alive = false;
  }


  this.sub = this.http.get(url)
    .takeUntil(this.killer)
    .subscribe();

  ngOnDestroy() {
    this.killer();
  }
*/