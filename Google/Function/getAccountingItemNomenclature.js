function getAccountingItemNomenclature(sourceSheetID, sourceSheetName) {
  var metaData =  getAccountingItem(sourceSheetID, sourceSheetName)
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push(metaData[i].nomenclature)
  }
  return metaValue
}
