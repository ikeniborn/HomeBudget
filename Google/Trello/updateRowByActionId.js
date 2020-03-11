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
      ss = postObject.sourceSheetNameFactTrelloOpen
      sourceData = getCurrData(getAllData(postObject, 'buffer', 'fact'), postObject.ymd)
      sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      ts = postObject.targetSheetNameFactOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'fact'), postObject.ymd)
      targetRows = targetData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
    } else {
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      sourceData = getCurrData(getAllData(postObject, 'buffer', 'budget'), postObject.ymd)
      var sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      ts = postObject.targetSheetNameBudgetOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'budget'), postObject.ymd)
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