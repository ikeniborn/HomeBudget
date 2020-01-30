function getData(SheetID, SheetName) {
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  var ssArrays = ss.getDataRange().getValues()
  var ssData = ssArrays.reduce(function (row, array, index) {
    var ssArrayData = {}
    ssArrayData.date = array[0]
    ssArrayData.period = array[1]
    ssArrayData.cfo = array[2]
    ssArrayData.mvz = array[3]
    ssArrayData.cashFlow = null
    ssArrayData.bill = array[4]
    ssArrayData.account = array[5]
    ssArrayData.nomenclature = array[6]
    ssArrayData.sum = array[7]
    ssArrayData.comment = array[8]
    ssArrayData.idAction = array[9]
    if (!array[10]) {
      ssArrayData.username = array[10]
    } else {
      ssArrayData.username = null
    }
    if (!array[10]) {
      ssArrayData.username = array[10]
    } else {
      ssArrayData.username = null
    }
    ssArrayData.indexRow = index + 1
    row.push(ssArrayData)
    return row
  })
  return ssData
}