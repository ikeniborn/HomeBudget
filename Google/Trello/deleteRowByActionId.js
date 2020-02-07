function deleteRowByActionId(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getAllData(sheetID, sheetName)
  var postObjectRow = currData.filter(function (row) {
    return row.actionId == postObject.actionId
  })
  postObjectRow.forEach(function (row) {
    ss.deleteRow(row.indexRow)
  })
  return postObjectRow.length > 1 ? postObjectRow[0] : postObjectRow
}