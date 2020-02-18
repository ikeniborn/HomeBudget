function getParametr(globalVar, parametr) {
  var array = [] && SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.parametrSheetName).getDataRange().getValues()
  var parametrRow = array.filter(function (row) {
    return row[1] == parametr
  })
  parametrRow = flatten(parametrRow)
  return {
    id: parametrRow[0],
    name: parametrRow[1],
    value: parametrRow[2]
  }
}