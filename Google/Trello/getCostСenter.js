// получение справочника мвз
function getCostСenter(sheetID, sheetName) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var ssArrays = ss.getDataRange().getValues()
  var ssData = []
  ssArrays.reduce(function (row, array, index) {
    if (index == 0) {} else {
      row = {}
      row.id = array[0]
      row.alias = array[1]
      row.name = array[2]
      row.type = array[3]
      return ssData.push(row)
    }
  }, [])
  return ssData
}