// обновление параметра
function updateParametr(globalVar, paramentr, value) {
  var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.parametrSheetName);
  var row = getParametr(globalVar, paramentr).id + 1
  ss.getRange(row, 3).setValue(value)
  ss.getRange(row, 4).setValue(formatterDate().timestamp)
}