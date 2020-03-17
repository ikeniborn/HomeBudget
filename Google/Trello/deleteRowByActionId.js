function deleteRowByActionId(postObject) {
  try {
    var ss
    var sourceData
    var sourceRows
    var ts
    var targetArray
    var targetData
    var targetRows
    var targetRowIndex
    //* удаление данных на листе источнике
    ss = postObject.sourceSheetNameTrelloOpen
    sourceData = postObject.dataTrelloAllCurr
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
    })
    //* удаление данных на листе учета
    ts = postObject.targetSheetNameAccountOpen
    targetData = postObject.dataAccountAllCurr
    targetRows = targetData.reduce(function (row, array) {
      if (array.actionId == postObject.actionId) {
        row.push(array)
      }
      row.sort(function (a, b) {
        return b.indexRow - a.indexRow
      })
      return row
    }, [])
    targetRows.forEach(function (row) {
      ts.deleteRow(row.indexRow)
    })
    //* удаление данных в массиве учета
    var accountArray = [postObject.dataAccountFactCurr, postObject.dataAccountBudgetCurr]
    accountArray.forEach(function (array) {
      targetArray = array
      targetRowIndex = targetArray.reduce(function (row, array, index) {
        if (array.actionId == postObject.actionId) {
          row = index
        }
        return row
      })
      array.splice(targetRowIndex, 1)
    })
    return targetRows[0]
  } catch (e) {
    console.error('deleteRowByActionId: ' + e)
  }
}