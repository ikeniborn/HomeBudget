function updateTrelloBuffer(globalVar, postObject, boardId) {
  var sheetName
  if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameFactTrello
  } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(boardId) !== -1) {
    sheetName = globalVar.sourceSheetNameBudgetTrello
  }
  //* добавление строк на страницу
  var targetArray = getCurrData(getAllData(globalVar, globalVar.sourceSheetID, sheetName), postObject.period)
  var searchRow = targetArray.filter(function (row) {
    return row.actionId == postObject.actionId
  })
  if (searchRow.length == 0) {
    var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(sheetName)
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])
  }
  // Удаление пустых строк
  deleteEmptyRow(globalVar.sourceSheetID, sheetName)
}