// get sheet with name Trello, clear all contents, add titles
function getLastDateArray(sheetID, sheetName) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var array = ss.getDataRange().getValues()
  var lastColumn = ss.getLastColumn() - 1
  // get last date from loaf array
  var filterArray = array.filter(function (row) {
    return row[lastColumn] == sheetName
  })
  var maxDate = filterArray.reduce(function (a, b) {
    return a[0] > b[0] ? a[0] : b[0]
  }, startDate(1))
  return maxDate
}