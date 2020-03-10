function updateTrelloBuffer(postObject) {
  try {
    var sheetName
    if (postObject.isFact) {
      sheetName = postObject.sourceSheetNameFactTrello
    } else {
      sheetName = postObject.sourceSheetNameBudgetTrello
    }
    //* добавление строк на страницу
    var ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(sheetName)
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])

    // Удаление пустых строк
    deleteEmptyRow(postObject.sourceSheetID, sheetName)
  } catch (e) {
    console.error('updateTrelloBuffer: ' + e)
  }
}