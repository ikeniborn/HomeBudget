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
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}