function deleteRowByActionId(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getAllData(sheetID, sheetName)
  var postObjectRow = {}
  var allRow = currData.reduce(function (row, array, index) {
    if (array.actionId == postObject.actionId) {
      postObjectRow = array
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
  return postObjectRow
}