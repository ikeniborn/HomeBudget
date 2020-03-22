function isValidData(postObject) {
  try {
    //* добавление строк на страницу
    var targetArray = postObject.dataTrello
    var searchRow = targetArray.reduce(function (row, array) {
      array.actionId == postObject.actionId ? row = false : row = true
      return row
    }, false)
    return searchRow
  } catch (e) {
    console.error('isValidData: ' + e)
  }
}