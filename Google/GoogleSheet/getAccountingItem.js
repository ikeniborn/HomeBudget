// получаение справочника статей
function getAccountingItem(sheetID, sheetName, nomenclature) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var ssArrays = ss.getDataRange().getValues()
  var ssData = {}
  ssArrays.reduce(function (row, array, index) {
    if (array[4] == nomenclature) {
      row = {}
      row.id = array[0]
      row.cashFlow = array[1]
      row.bill = array[2]
      row.account = array[3]
      row.nomenclature = array[4]
      row.family = array[5]
      row.ilya = array[6]
      row.oksana = array[7]
      row.form = array[8]
      ssData = row
    }
  }, {})
  return ssData
}