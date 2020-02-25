function updateTrelloBuffer(globalVar, postObject) {
  try {
    var sheetName
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameFactTrello
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameBudgetTrello
    }
    //* добавление строк на страницу
    var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(sheetName)
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])

    // Удаление пустых строк
    deleteEmptyRow(globalVar.sourceSheetID, sheetName)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  } finally {
    console.log('updateTrelloAccounting: complete')
  }
}