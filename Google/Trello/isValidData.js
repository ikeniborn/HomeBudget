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
    var searchRow = targetArray.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    if (searchRow.length == 0) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error('isValidData: ' + e)
  }
}