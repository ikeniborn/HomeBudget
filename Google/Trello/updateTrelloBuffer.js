function updateTrelloBuffer(postObject, boardId) {
  var globalVar = getVariable()
  var sheetName
  if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameFactTrello
  } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameBudgetTrello
  }
  // get sheet Google
  var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(sheetName)
  // добавление строк на страницу
  ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])
}