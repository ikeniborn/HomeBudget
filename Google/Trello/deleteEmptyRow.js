function deleteEmptyRow(sheetId, sheetName) {
  try {
    var ss = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName)
    var maxRows = ss.getMaxRows()
    var lastRow = ss.getLastRow()
    if (maxRows - lastRow !== 0) {
      ss.deleteRows(lastRow + 1, maxRows - lastRow)
    }
  } catch (e) {
    console.error('deleteEmptyRow: ' + e)
  }
}