function updateRowByActionId(globalVar, sheetID, sheetName, postObject) {
  var ss = SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  var currData = getCurrData(getAllData(globalVar, sheetID, sheetName), postObject.ymd)
  var postObjectRow
  currData.forEach(function (row) {
    if (row.actionId == postObject.actionId) {
      if ([globalVar.sourceSheetID].indexOf(sheetID) !== -1 && [globalVar.sourceSheetNameFactTrello, globalVar.sourceSheetNameBudgetTrello].indexOf(sheetName) !== -1) {
        row.actionDate = postObject.actionDate
        ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ss.getRange(row.indexRow, 5).setValue(postObject.sum)
        ss.getRange(row.indexRow, 6).setValue(postObject.comment)
        postObjectRow = row
      } else if ([globalVar.targetSheetID].indexOf(sheetID) !== -1 && [globalVar.targetSheetNameFact, globalVar.targetSheetNameBudget].indexOf(sheetName) !== -1) {
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