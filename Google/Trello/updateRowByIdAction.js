function updateRowByIdAction(sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getCurrData(getAllData(sheetID, sheetName))
  var postObjectRow
  currData.forEach(function (row) {
    if (row.idAction == postObject.actionId) {
      if ([sourceSheetID].indexOf(sheetID) !== -1 && [sourceSheetNameFactTrello, sourceSheetNameBudgetTrello].indexOf(sheetName) !== -1) {
        row.actionDate = postObject.actionDate
        ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ss.getRange(row.indexRow, 5).setValue(postObject.sum)
        ss.getRange(row.indexRow, 6).setValue(postObject.comment)
        postObjectRow = row
      } else if ([targetSheetID].indexOf(sheetID) !== -1 && [targetSheetNameFact, targetSheetNameBudget].indexOf(sheetName) !== -1) {
        row.actionDate = postObject.actionDate
        ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ss.getRange(row.indexRow, 8).setValue(postObject.sum)
        ss.getRange(row.indexRow, 9).setValue(postObject.comment)
        postObjectRow = row
      }
    }
  })
  return postObjectRow
}