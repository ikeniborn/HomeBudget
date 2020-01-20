function getMetadata(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName); // 'Типы' - имя листа с содержимым списков
  var metaData = ss.getDataRange().getValues();
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push(metaData[i])
  }
  return metaValue
}