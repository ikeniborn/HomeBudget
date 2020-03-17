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
    //* обновление данных на листе источнике
    ss = postObject.sourceSheetNameTrelloOpen
    sourceData = postObject.dataTrelloAllCurr
    sourceRows = sourceData.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    sourceRows.forEach(function (row) {
      ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ss.getRange(row.indexRow, 5).setValue(postObject.sum)
      ss.getRange(row.indexRow, 6).setValue(postObject.comment)
    })
    //* обновление данных на листе учета
    ts = postObject.targetSheetNameAccountOpen
    targetData = postObject.dataAccountAllCurr
    targetRows = targetData.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    targetRows.forEach(function (row) {
      ts.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ts.getRange(row.indexRow, 8).setValue(postObject.sum)
      ts.getRange(row.indexRow, 9).setValue(postObject.comment)
    })
    //* обновление данных в массиве учета
    var accountArray = [postObject.dataAccountFactCurr, postObject.dataAccountBudgetCurr]
    accountArray.forEach(function (array) {
      array.map(function (array) {
        if (array.actionId == postObject.actionId) {
          array.actionDate = postObject.actionDate
          array.sum = postObject.sum
          array.comment = postObject.comment
        }
      })
    })
  } catch (e) {
    console.error('updateRowByActionId: ' + e)
  }
}