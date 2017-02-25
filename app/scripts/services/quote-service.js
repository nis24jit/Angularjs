'use strict';

angular.module('stockDogApp')
  .service('QuoteService', function ($http, $interval) {
    var stocks = [];
    var BASE = 'http://query.yahooapis.com/v1/public/yql';

    var update = function (quotes) {
      console.log(quotes);
      // Ensure that the current quotes match registered stocks
      if (quotes.length === stocks.length) {
        _.each(quotes, function (quote, idx) {
          var stock = stocks[idx];
          stock.lastPrice = parseFloat(quote.LastTradePriceOnly);
          stock.change = quote.Change;
          stock.percentChange = quote.ChangeinPercent;
          stock.marketValue = stock.shares * stock.lastPrice;
          stock.dayChange = stock.shares * parseFloat(stock.change);
          stock.save();
        });
      }
    };

    this.register = function (stock) {
      stocks.push(stock);
    };

    this.deregister = function (stock) {
      _.remove(stocks, stock);
    };

    this.clear = function () {
      stocks = [];
    };

    this.fetch = function () {
      var symbols = _.reduce(stocks, function (symbols, stock) {
        symbols.push(stock.company.split("-")[0].trim());
        return symbols;
      }, []);
      var query = encodeURIComponent('select * from yahoo.finance.quotes where symbol in (\'' + symbols.join(',') + '\')');
      var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
      $http.jsonp(url + '&callback=JSON_CALLBACK')
        .success(function (data) {
          if (data && data.query.count) {
            var quotes = data.query.count > 1 ? data.query.results.quote : [data.query.results.quote];
            update(quotes);
          }
        })
        .error(function (data) {
          console.log(data);
        });
    };

    $interval(this.fetch, 5000);
  });


//https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
