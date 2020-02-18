// обновление параметра
function updateParametr(globalVar, paramentr, value) {
  var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.parametrSheetName);
  var indexRow = getParametr(globalVar.parametrArray, paramentr).indexRow
  ss.getRange(indexRow, 3).setValue(value)
  ss.getRange(indexRow, 4).setValue(formatterDate().timestamp)
}