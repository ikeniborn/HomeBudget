function checkActionId(globalVar, postObject) {
  var sheetName
  if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameFactTrello
  } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameBudgetTrello
  }
  //* добавление строк на страницу
  var targetArray = getCurrData(getAllData(globalVar, globalVar.sourceSheetID, sheetName), postObject.ymd)
  var searchRow = targetArray.filter(function (row) {
    return row.actionId == postObject.actionId
  })

  return searchRow.length
}