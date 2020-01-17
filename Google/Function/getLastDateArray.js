function getLastDateArray(sheetID, sheetName) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var array = ss.getDataRange().getValues()
  var lastColumn = ss.getLastColumn() - 1
  // get last date from load array
  var filterArray = array.filter(function (row) {
    if (sheetName == 'Факт' || sheetName == 'Бюджет') {
      return row[lastColumn] == sheetName
    } else {
      return row
    }
  })
  var maxDate = filterArray.reduce(function (a, b) {
    return a[0] > b[0] ? a[0] : b[0]
  }, startDate(1))
  return maxDate
}