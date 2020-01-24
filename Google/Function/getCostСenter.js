function getCostСenter(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName); // 'Типы' - имя листа с содержимым списков
  var metaData = ss.getDataRange().getValues();
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push({'id':metaData[i][0],'alias':metaData[i][1],'name':metaData[i][2],'type':metaData[i][3]})
  }
  return metaValue
}
