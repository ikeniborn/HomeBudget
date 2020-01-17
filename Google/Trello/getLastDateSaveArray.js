// get sheet with name Trello, clear all contents, add titles
function getLastDateSaveArray(googleId, sheetName) {
  var ss = SpreadsheetApp.openById(googleId).getSheetByName(sheetName)
  var ssArray = ss.getDataRange().getValues()
  var arrayDate = []
  for (var j = 1; j < ssArray.length; j++) {
    arrayDate.push(ssArray[j][0])
  };
  // get last date from loaf array
  var maxDate = arrayDate.reduce(function (a, b) {
    return a > b ? a : b
  }, startDate(1))
  return maxDate
}