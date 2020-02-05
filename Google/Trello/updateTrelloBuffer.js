function updateTrelloBuffer(postObject, boardId) {
  var sheetName
  if ([boardIdFact, boardIdFact0].indexOf(boardId) !== -1) {
    sheetName = sourceSheetNameFactTrello
  } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(boardId) !== -1) {
    sheetName = sourceSheetNameBudgetTrello
  }
  // get sheet Google
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sheetName)
  // добавление строк на страницу
  ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])
}