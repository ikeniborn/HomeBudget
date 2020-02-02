// получаение номеклатур из справочника статей
function getAccountingItemNomenclature(sourceSheetID, sourceSheetName) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var metaData = ss.getDataRange().getValues()
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    if (metaData[i].form == 1) {
      metaValue.push(metaData[i].nomenclature)
    }
  }
  return metaValue
}