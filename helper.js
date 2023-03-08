function getExchangeRate(currencyCode, cell) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.okx.com/v3/c2c/tradingOrders/books?quoteCurrency=${currencyCode}&baseCurrency=USDT&side=sell&paymentMethod=all&userType=all&sortType=price_asc`;

  return $.get(url)
    .then(function(data) {
      // Parse the response JSON data
      const exchangeRate = data.data.sell[0].price;
      cell.text(exchangeRate);
    })
    .fail(function(error) {
      // Handle errors
      console.error(error);
    });
}


function getFxRate(cellList) {
  const xeUrl = 'https://cors-anywhere.herokuapp.com/https://www.xe.com/_next/data/JFeY0MnZuoxnYOVJj5Q5F/en/currencyconverter/convert.json?Amount=1&From=USD&To=EUR'
    return $.get(xeUrl)
    .then(function(data) {
      // Parse the response JSON data
      const rates = data.pageProps.initialRatesData.rates;

      // Iterate through the cellList and update each cell with the corresponding exchange rate
      for (let i = 0; i < cellList.length; i++) {
        const currency = cellList[i][0];
        const cell = cellList[i][1];
        const exchangeRate = rates[currency];
        cell.text(exchangeRate.toFixed(2));
      }
    })
    .fail(function(error) {
      // Handle errors
      console.error(error);
    });

}
