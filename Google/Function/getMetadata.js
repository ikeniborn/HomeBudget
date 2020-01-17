function getMetadata(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sourceSheetID) // Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss); // Делаем книгу активной
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourceSheetName); // 'Типы' - имя листа с содержимым списков
  var metaData = metaSheet.getDataRange().getValues();
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push(metaData[i])
  }
  return metaValue
}