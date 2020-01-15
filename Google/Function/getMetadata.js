function getMetadata(sheetID, sheetName) {
  var ss = SpreadsheetApp.openById(sheetID) //Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss); //Делаем книгу активной
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); // 'Типы' - имя листа с содержимым списков
  var metaData = metaSheet.getDataRange().getValues();
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push(metaData[i])
  }
  return metaValue
}