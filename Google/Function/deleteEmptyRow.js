function deleteEmptyRow(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName)
  var maxRows = ss.getMaxRows();
  var lastRow = ss.getLastRow();
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow);
  }
}