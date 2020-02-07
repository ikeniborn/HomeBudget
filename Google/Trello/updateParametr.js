// обновление параметра
function updateParametr(paramentr, value) {
  var globalVar = getVariable()
  var ss = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.parametrSheetName);
  var row = getParametr(paramentr).id + 1
  ss.getRange(row, 3).setValue(value)
}