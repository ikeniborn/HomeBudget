function getAllData(sheetId, sheetName) {
  var ss = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName)
  var ssArrays = ss.getDataRange().getValues()

  var ssData = []
  ssArrays.reduce(function (row, array, index) {
    if (index == 0) {} else {
      row = {}
      if ([sourceSheetNameFactTrello, sourceSheetNameBudgetTrello].indexOf(sheetName) !== -1) {
        row.date = array[0]
        row.period = array[1]
        row.cfo = array[2]
        row.mvz = null
        row.cashFlow = null
        row.bill = null
        row.account = null
        row.nomenclature = array[3]
        row.sum = array[4]
        row.comment = array[5]
        row.idAction = array[6]
        row.sourceList = null
        row.indexRow = index + 1
      } else if ([sourceSheetNameFactGoogleForm, sourceSheetNameBudgetGoogleForm].indexOf(sheetName) !== -1) {
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
        row.idAction = null
        row.sourceList = null
        row.indexRow = index + 1
      } else if ([targetSheetNameFact, targetSheetNameBudget].indexOf(sheetName) !== -1) {
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
      }
      return ssData.push(row)
    }
  }, [])
  return ssData
}