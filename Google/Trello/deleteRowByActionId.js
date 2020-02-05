function deleteRowByActionId(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getAllData(sheetID, sheetName)
  var postObjectRow = {}
  currData.forEach(function (row) {
    if (row.actionId == postObject.actionId) {
      postObjectRow = row
      ss.deleteRow(row.indexRow)
    }
  })
  return postObjectRow
}