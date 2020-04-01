function openGoogleSheet(sheetID, sheetName) {
  try {
    // открытие листа
    return SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}