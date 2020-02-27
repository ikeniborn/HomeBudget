function isValidData(postObject) {
  try {
    var sheetName
    if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      sheetName = postObject.sourceSheetNameFactTrello
    } else if ([postObject.boardIdBudget, postObject.boardIdBudget2, postObject.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
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