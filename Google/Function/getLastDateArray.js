function getLastDateArray(sheetID, sheetName, filter) {
  if (filter == undefined) filter = false
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var array = ss.getDataRange().getValues()
  var lastColumn = ss.getLastColumn() - 1
  // get last date from load array
  var targetSheetName = ['Факт', 'Бюджет']
  var arrayDate = []
  for (i = 0; i < array.length; i++) {
    var row = array[i]
    if (targetSheetName.indexOf(sheetName) !== -1) {
      if (row[lastColumn] == filter) {
        arrayDate.push(row[0])
      }
    } else {
      arrayDate.push(row[0])
    }
  }
  var maxDate = arrayDate.reduce(function (a, b) {
    return a > b ? a : b
  }, startDate(1))
  return maxDate
}