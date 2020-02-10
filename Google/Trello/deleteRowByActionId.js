function deleteRowByActionId(globalVar, sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getCurrData(getAllData(globalVar, sheetID, sheetName), postObject.ymd)
  var allRow = currData.reduce(function (row, array) {
    if (array.actionId == postObject.actionId) {
      row.push(array)
    }
    row.sort(function (a, b) {
      return b.indexRow - a.indexRow
    })
    return row
  }, [])
  allRow.forEach(function (row) {
    ss.deleteRow(row.indexRow)
  })
}