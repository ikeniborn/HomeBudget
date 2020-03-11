function updateRowByActionId(postObject) {
  /*
   * @postObject - данные реквеста
   * */
  try {
    var ss
    var sourceArray
    var sourceData
    var sourceRows
    var ts
    var targetArray
    var targetData
    var targetRows
    if (postObject.isFact) {
      //* обновление данных на листе источнике
      ss = postObject.sourceSheetNameFactTrelloOpen
      sourceData = getCurrData(getAllData(postObject, 'buffer', 'fact'), postObject.ymd)
      sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      sourceRows.forEach(function (row) {
        ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ss.getRange(row.indexRow, 5).setValue(postObject.sum)
        ss.getRange(row.indexRow, 6).setValue(postObject.comment)
      })
      //* обновление данных в массиве истонике
      sourceArray = postObject.sourceSheetNameFactTrelloArray
      postObject.sourceSheetNameFactTrelloArray = sourceArray.map(function (array) {
        if (array[6] == postObject.actionId) {
          array[0] = postObject.actionDate
          array[4] = postObject.sum
          array[5] = postObject.comment
        }
      })
      //* обновление данных на листе учета
      ts = postObject.targetSheetNameFactOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'fact'), postObject.ymd)
      targetRows = targetData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      targetRows.forEach(function (row) {
        ts.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ts.getRange(row.indexRow, 8).setValue(postObject.sum)
        ts.getRange(row.indexRow, 9).setValue(postObject.comment)
      })
      //* обновление данных в массиве учета
      targetArray = postObject.targetSheetNameFactArray
      postObject.targetSheetNameFactArray = targetArray.map(function (array) {
        if (array[9] == postObject.actionId) {
          array[0] = postObject.actionDate
          array[7] = postObject.sum
          array[8] = postObject.comment
        }
      })
    } else if (postObject.isBudget) {
      //* обновление данных на листе источнике
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      sourceData = getCurrData(getAllData(postObject, 'buffer', 'budget'), postObject.ymd)
      sourceRows = sourceData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      sourceRows.forEach(function (row) {
        ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ss.getRange(row.indexRow, 5).setValue(postObject.sum)
        ss.getRange(row.indexRow, 6).setValue(postObject.comment)
      })
      //* обновление данных в массиве истонике
      sourceArray = postObject.sourceSheetNameBudgetTrelloArray
      postObject.sourceSheetNameBudgetTrelloArray = sourceArray.map(function (array) {
        if (array[6] == postObject.actionId) {
          array[0] = postObject.actionDate
          array[4] = postObject.sum
          array[5] = postObject.comment
        }
      })
      //* обновление данных на листе учета
      ts = postObject.targetSheetNameBudgetOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'budget'), postObject.ymd)
      targetRows = targetData.filter(function (row) {
        return row.actionId == postObject.actionId
      })
      targetRows.forEach(function (row) {
        ts.getRange(row.indexRow, 1).setValue(postObject.actionDate)
        ts.getRange(row.indexRow, 8).setValue(postObject.sum)
        ts.getRange(row.indexRow, 9).setValue(postObject.comment)
      })
      //* обновление данных в массиве учета
      targetArray = postObject.targetSheetNameBudgetArray
      postObject.targetSheetNameBudgetArray = targetArray.map(function (array) {
        if (array[9] == postObject.actionId) {
          array[0] = postObject.actionDate
          array[7] = postObject.sum
          array[8] = postObject.comment
        }
      })
    }
  } catch (e) {
    console.error('updateRowByActionId: ' + e)
  }
}