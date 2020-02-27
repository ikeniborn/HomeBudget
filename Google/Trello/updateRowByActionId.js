function updateRowByActionId(postObject) {
  /*
   * @postObject - данные реквеста
   * */
  try {
    var ss
    var sourceData
    var sourceRows
    var ts
    var targetData
    var targetRows
    if (postObject.isFact) {
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameFactTrello)
      sourceData = getCurrData(getAllData(postObject, postObject.sourceSheetID, postObject.sourceSheetNameFactTrello), postObject.ymd)
      sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameFact)
      targetData = getCurrData(getAllData(postObject, postObject.targetSheetID, postObject.targetSheetNameFact), postObject.ymd)
      targetRows = targetData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
    } else {
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameBudgetTrello)
      sourceData = getCurrData(getAllData(postObject, postObject.sourceSheetID, postObject.sourceSheetNameBudgetTrello), postObject.ymd)
      var sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameBudget)
      targetData = getCurrData(getAllData(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget), postObject.ymd)
      targetRows = targetData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
    }
    sourceRows.forEach(function (row) {
      ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ss.getRange(row.indexRow, 5).setValue(postObject.sum)
      ss.getRange(row.indexRow, 6).setValue(postObject.comment)
    })
    targetRows.forEach(function (row) {
      ts.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ts.getRange(row.indexRow, 8).setValue(postObject.sum)
      ts.getRange(row.indexRow, 9).setValue(postObject.comment)
    })
  } catch (e) {
    console.error('updateParametr: ' + e)
  }
}