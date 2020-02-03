// обновление параметра
function updateParametr(sourceSheetID, parametrSheetName, paramentr, value) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(parametrSheetName);
  var row = getParametr(sourceSheetID, parametrSheetName, paramentr).id + 1
  ss.getRange(row, 3).setValue(value)
}