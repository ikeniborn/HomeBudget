function getAllData(sheetID, sheetName) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var ssArrays = ss.getDataRange().getValues()
  var ssData = []
  ssArrays.reduce(function (row, array, index) {
    if (index == 0) {} else {
      row = {}
      row.date = array[0]
      row.period = array[1]
      row.cfo = array[2]
      row.mvz = array[3]
      row.cashFlow = null
      row.bill = array[4]
      row.account = array[5]
      row.nomenclature = array[6]
      row.sum = array[7]
      row.comment = array[8]
      row.idAction = array[9]
      row.sourceList = array[10]
      row.indexRow = index + 1
      return ssData.push(row)
    }
  }, [])
  return ssData
}