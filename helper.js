function getExchangeRate(currencyCode, cell) {
  const url = `https://www.binance.com/bapi/fiat/v3/public/fiatpayment/buy/get-crypto-list?fiatCurrency=${currencyCode}`;

  return $.get(url)
    .then(function(data) {
    // find the index of the desired currency in the list
    const usdtIndex = data.data.cryptoList.findIndex(item => item.assetCode === 'USDT');
    if (usdtIndex !== -1) {
      // extract the USDT price
      const exchangeRate = data.data.cryptoList[usdtIndex].quotation;
      cell.text(exchangeRate);
    } else {
      cell.text('Exchange Rate Not Found!');
    }
//    // Parse the response JSON data
//    const exchangeRate = data.data.sell[0].price;
//    cell.text(exchangeRate);
    })
    .fail(function(error) {
      // Handle errors
      console.error(error);
    });
}


function getFxRate(cellList) {
  const xeUrl = 'https://open.er-api.com/v6/latest/USD'
    return $.get(xeUrl)
    .then(function(data) {
      // Parse the response JSON data
      const rates = data.rates;

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
