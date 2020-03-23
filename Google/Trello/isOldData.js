function isOldData(postObject) {
  try {
    //* добавление строк на страницу
    var targetArray = postObject.dataTrello
    var searchRow = targetArray.reduce(function (row, array) {
      if (array.actionId == postObject.actionId) {
        row = true
      }
      return row
    }, false)
    return searchRow
  } catch (e) {
    console.error('isValidData: ' + e)
  }
}