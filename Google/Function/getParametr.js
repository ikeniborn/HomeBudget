function getParametr(sheetID,sheetName,parametr) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var array = ss.getDataRange().getValues()
  var parametrRow = array.filter(function(row){
      return row[1]==parametr
    })
  parametrRow = flatten(parametrRow)
  return {'id':parametrRow[0],'name':parametrRow[1],'value':parametrRow[2]}
}