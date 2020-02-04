function updateRowByIdAction(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getCurrData(getAllData(sheetID, sheetName))
  currData.forEach(function (row) {
    if (row.idAction == postObject.actionId) {
      if ([sourceSheetID].indexOf(sheetID) !== -1 && [sourceSheetNameFactTrello, sourceSheetNameBudgetTrello].indexOf(sheetName) !== -1) {
        ss.getRange(row.indexRow, 5).setValue(postObject.sum)
        ss.getRange(row.indexRow, 6).setValue(postObject.comment)
      } else if ([targetSheetID].indexOf(sheetID) !== -1 && [targetSheetNameFact, targetSheetNameBudget].indexOf(sheetName) !== -1) {
        ss.getRange(row.indexRow, 8).setValue(postObject.sum)
        ss.getRange(row.indexRow, 9).setValue(postObject.comment)
      }
    }
  })
}