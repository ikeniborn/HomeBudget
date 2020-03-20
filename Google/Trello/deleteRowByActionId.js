function deleteRowByActionId(postObject) {
  try {
    var ss
    var sourceData
    var sourceRows
    var ts
    var targetData
    var targetRowIndex = []
    var sum = 0
    //* удаление данных на листе источнике
    ss = postObject.trelloOpen
    sourceData = postObject.dataTrello
    sourceRows = sourceData.reduce(function (row, array) {
      if (array.actionId == postObject.actionId) {
        row.push(array)
      }
      row.sort(function (a, b) {
        return b.indexRow - a.indexRow
      })
      return row
    }, [])
    sourceRows.forEach(function (row) {
      ss.deleteRow(row.indexRow)
      sum = row.sum
    })
    //* удаление данных на листе учета
    ts = postObject.targetSheetNameAccountOpen
    targetData = postObject.accountArray
    targetData.reduce(function (row, array, index) {
      if (array[10] == postObject.actionId) {
        row = index + 1
        targetRowIndex.push(row)
      }
      return row
    }, [])
    targetRowIndex.forEach(function (row) {
      ts.deleteRow(row)
      //* удаление данных в массиве учета
      targetData.splice(row - 1, 1)
    })
    //* получение данных учета после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
    postObject.dataAccountFactCurr = getCurrData(postObject, 'Факт')
    postObject.dataAccountBudgetCurr = getCurrData(postObject, 'Бюджет')
    return sum
  } catch (e) {
    console.error('deleteRowByActionId: ' + e)
  }
}