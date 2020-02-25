function encodeData(data, symbol) {
  try {
    var encodeSymbol = encodeURIComponent(symbol)
    var encodeData = encodeURIComponent(data)
    if (encodeData.match(encodeSymbol)) {
      return data.replace(symbol, encodeURIComponent(symbol))
    } else {
      return data
    }
  } catch (e) {
    console.error('encodeData: ' + e)
  } finally {
    console.log('encodeData: complete')
  }
}