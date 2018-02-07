(function () {
  // NOTE: Setup ---------------------------------------------

  const { Observable } = Rx;
  const { fromEvent, ajax: { getJSON }, interval, webSocket, timer } = Observable;
  const { map, switchMap, retryWhen } = Rx.operators;
  
  // the div containing the search suggestion results
  const suggestions = document.querySelector('#suggestions');

  // the div containing the selected tickers
  const tickers = document.querySelector('#tickers');

  // the search input element
  const q = document.querySelector('#q');

  // a function to get the search results URL
  const getSearchURL = (query) => `/search?q=${query}`;
  // ---------------------------------------------------------

  fromEvent(q, 'input')
    .pipe(
      map(() => q.value),
      switchMap(search => getJSON(getSearchURL(search)))
    )
    .subscribe(showSuggestions);

  /**
      TODO: create an subscribe to an observable that does the
            look ahead search

      NOTE: You don't have to keep the subscription to it, as it will
            be active for the life of this application.
  */

  // TODO: setup a WebSocketSubject
  const socket$ = webSocket('ws://localhost:8080');

  function multiplex(symbol) {
    return socket$.multiplex(
      () => JSON.stringify({ type: 'sub', symbol }),
      () => JSON.stringify({ type: 'unsub', symbol }),
      d => d.symbol === symbol,
    ).pipe(
      retryWhen(
        error$ => error$.pipe(
          switchMap(() => timer(2000)),
        )
      )
    )
  }
  
  function getTickerStream(symbol) {
    // TODO: multiplex the web socket (then add retry logic)
    return multiplex(symbol).pipe(
      map(d => d.price)
    );
  };

  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // Hacky render code past here. Just for demoing purposes. Not best practice!
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************

  function showSuggestions(results) {
    let html = '<ul>';
    results.forEach(({ symbol, name }) => {
      html += `<li>
        <a href="javascript:selectSymbol('${symbol}')">
          ${symbol} - ${name}
        </a>
      </li>`;
    })
    html += '</ul>';

    suggestions.innerHTML = html;
    return html;
  };

  // a hook that is called when a symbol is selected from the suggestions.
  function selectSymbol(symbol) {
    addTicker(symbol);
    suggestions.innerHTML = '';
  };

  function addTicker(symbol) {
    const id = 'ticker-' + symbol;
    if (document.querySelector('#' + id)) {
      return;
    }
    const ticker = document.createElement('x-ticker-display');
    ticker.id = id;
    ticker.title = symbol;
    ticker.data = getTickerStream(symbol);
    tickers.appendChild(ticker);
  };

  window.selectSymbol = selectSymbol;
} ());
