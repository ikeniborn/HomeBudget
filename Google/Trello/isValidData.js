function isValidData(postObject) {
  try {
    var type
    if (postObject.isFact) {
      type = 'fact'
    } else if (postObject.isTarget) {
      type = 'target'
    } else if (postObject.isBudget) {
      type = 'budget'
    }
    //* добавление строк на страницу
    var targetArray = getAllData(postObject, 'account', type)
    var searchRow = targetArray.reduce(function (row, array) {
      array.actionId == postObject.actionId ? row = false : row = true
      return row
    }, [false])
    return searchRow
  } catch (e) {
    console.error('isValidData: ' + e)
  }
}