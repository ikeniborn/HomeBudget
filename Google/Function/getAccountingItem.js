function getAccountingItem(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName); // 'Типы' - имя листа с содержимым списков
  var metaData = ss.getDataRange().getValues();
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push({'id':metaData[i][0],'nomenclature':metaData[i][1],'account':metaData[i][2],'bill':metaData[i][3]})
  }
  return metaValue
}