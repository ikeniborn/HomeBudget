function updateTrelloBuffer(postObject, SheetID, SheetName) {
  // get sheet Google
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  // добавление строк на страницу
  ss.appendRow([postObject.actionDate, postObject.period, postObject.listName, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])
}