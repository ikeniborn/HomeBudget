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
    var targetRowIndex = []
    //* обновление данных на листе источнике
    ss = postObject.trelloOpen
    sourceData = postObject.dataTrello
    sourceRows = sourceData.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    sourceRows.forEach(function (row) {
      ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ss.getRange(row.indexRow, 6).setValue(postObject.sum)
      ss.getRange(row.indexRow, 7).setValue(postObject.comment)
    })
    //* обновление данных на листе учета
    ts = postObject.accountOpen
    targetData = postObject.accountArray
    targetData.reduce(function (row, array, index) {
      if (array[10] == postObject.actionId) {
        row = index + 1
        targetRowIndex.push(row)
      }
      return row
    }, [])
    targetRowIndex.forEach(function (row) {
      ts.getRange(row, 1).setValue(postObject.actionDate)
      ts.getRange(row, 9).setValue(postObject.sum)
      ts.getRange(row, 10).setValue(postObject.comment)
    })
    //* обновление данных в массиве учета
    targetData.map(function (array) {
      if (array[10] == postObject.actionId) {
        array[0] = postObject.actionDate
        array[8] = postObject.sum
        array[9] = postObject.comment
      }
    })
    //* получение текущих данных после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
    postObject.dataAccountFactCurr = getCurrData(postObject, 'Факт')
    postObject.dataAccountBudgetCurr = getCurrData(postObject, 'Бюджет')
  } catch (e) {
    console.error('updateRowByActionId: ' + e)
  }
}