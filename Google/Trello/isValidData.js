function isValidData(postObject) {
  try {
    var sheetName
    if (postObject.isFact) {
      sheetName = postObject.sourceSheetNameFactTrello
    } else if (postObject.isTarget) {
      sheetName = postObject.sourceSheetNameTargetTrello
    } else {
      sheetName = postObject.sourceSheetNameBudgetTrello
    }
    //* добавление строк на страницу
    var targetArray = getAllData(postObject, postObject.sourceSheetID, sheetName)
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