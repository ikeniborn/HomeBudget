function checkActionId(globalVar, postObject) {
  try {
    var sheetName
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameFactTrello
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameBudgetTrello
    }
    //* добавление строк на страницу
    var targetArray = getAllData(globalVar, globalVar.sourceSheetID, sheetName)
    var searchRow = targetArray.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    return searchRow.length
  } catch (e) {
    console.error('checkActionId: ' + e)
  } finally {
    console.log('checkActionId: complete ')
  }

}