function deleteRowByActionId(postObject) {
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
      sourceRows = sourceData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
      ts = postObject.targetSheetNameFactOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'fact'), postObject.ymd)
      targetRows = targetData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
    } else {
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      sourceData = getCurrData(getAllData(postObject, 'buffer', 'budget'), postObject.ymd)
      sourceRows = sourceData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
      ts = postObject.targetSheetNameBudgetOpen
      targetData = getCurrData(getAllData(postObject, 'account', 'budget'), postObject.ymd)
      targetRows = targetData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
    }
    sourceRows.forEach(function (row) {
      ss.deleteRow(row.indexRow)
    })
    targetRows.forEach(function (row) {
      ts.deleteRow(row.indexRow)
    })
    return targetRows[0]
  } catch (e) {
    console.error('deleteRowByActionId: ' + e)
  }
}