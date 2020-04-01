function isOldData(postObject) {
  try {
    //* добавление строк на страницу
    var targetArray = postObject.dataTrello
    var searchRow = targetArray.reduce(function (row, array) {
      if (array.actionId.match(postObject.actionId)) {
        row = true
      }
      return row
    }, false)
    return searchRow
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}