function encodeData(data, symbol) {
  if (data.match(symbol)) {
    var encodeData = data.replace(symbol, encodeURIComponent(symbol))
    return encodeData
  } else {
    return data
  }
}