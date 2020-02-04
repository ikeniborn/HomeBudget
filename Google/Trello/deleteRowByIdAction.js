function deleteRowByIdAction(sheetID, sheetName, idAction) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getCurrData(getAllData(sheetID, sheetName))
  currData.forEach(function (row) {
    if (row.idAction == idAction) {
      ss.deleteRow(row.indexRow)
    }
  })
}