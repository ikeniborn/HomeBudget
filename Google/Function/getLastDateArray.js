// // get sheet with name Trello, clear all contents, add titles
// function getLastDateArray(sourceSheetID, sourceSheetName) {
//   var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName)
//   var ssArray = ss.getDataRange().getValues()
//   // get last date from loaf array
//   var maxDate = ssArray.reduce(function (a, b) {
//     return a[0] > b[0] ? a[0] : b[0]
//   }, startDate(1))
//   return maxDate
// }

var dd = [3, 2, 5].reduce(function (a, b) {
  return b == '2' ? a > b ? a : b
})
console.log(dd)