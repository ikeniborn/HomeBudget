function deleteRowByIdAction(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var postObjectRow
  var currData = getCurrData(getAllData(sheetID, sheetName))
  currData.forEach(function (row) {
    if (row.idAction == postObject.idAction) {
      row.actionDate = postObject.actionDate
      ss.deleteRow(row.indexRow)
      postObjectRow = row
    }
  })
  return postObjectRow
}