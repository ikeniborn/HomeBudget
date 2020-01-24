function getCostСenterAlias(sourceSheetID, sourceSheetName) {
  var metaData =  getCostСenter(sourceSheetID, sourceSheetName)
  var metaValue = []
  for (var i = 1; i < metaData.length; i++) {
    metaValue.push(metaData[i].alias)
  }
  return metaValue
}