function deleteRowByActionId(postObject) {
  try {
    var ss
    var sourceArray
    var sourceData
    var sourceRows
    var sourceRowIndex
    var ts
    var targetArray
    var targetData
    var targetRows
    var targetRowIndex
    if (postObject.isFact) {
      //* удаление данных на листе источнике
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
      sourceRows.forEach(function (row) {
        ss.deleteRow(row.indexRow)
      })
      //* удаление данных в массиве истонике
      sourceArray = postObject.sourceSheetNameFactTrelloArray
      sourceRowIndex = sourceArray.reduce(function (row, array, index) {
        if (array[6] == postObject.actionId) {
          row = index
        }
        return row
      })
      postObject.sourceSheetNameFactTrelloArray.splice(sourceRowIndex, 1)
      //* удаление данных на листе учета
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
      targetRows.forEach(function (row) {
        ts.deleteRow(row.indexRow)
      })
      //* удаление данных в массиве учета
      targetArray = postObject.targetSheetNameFactArray
      targetRowIndex = targetArray.reduce(function (row, array, index) {
        if (array[9] == postObject.actionId) {
          row = index
        }
        return row
      })
      postObject.targetSheetNameFactArray.splice(targetRowIndex, 1)
    } else if (postObject.isBudget) {
      //* удаление данных на листе источнике
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
      sourceRows.forEach(function (row) {
        ss.deleteRow(row.indexRow)
      })
      //* удаление данных в массиве истонике
      sourceArray = postObject.sourceSheetNameBudgetTrelloArray
      sourceRowIndex = sourceArray.reduce(function (row, array, index) {
        if (array[6] == postObject.actionId) {
          row = index
        }
        return row
      })
      postObject.sourceSheetNameBudgetTrelloArray.splice(sourceRowIndex, 1)
      //* удаление данных на листе учета
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
      targetRows.forEach(function (row) {
        ts.deleteRow(row.indexRow)
      })
      //* удаление данных в массиве учета
      targetArray = postObject.targetSheetNameBudgetArray
      targetRowIndex = targetArray.reduce(function (row, array, index) {
        if (array[9] == postObject.actionId) {
          row = index
        }
        return row
      })
      postObject.targetSheetNameBudgetArray.splice(targetRowIndex, 1)
    }
    return targetRows[0]
  } catch (e) {
    console.error('deleteRowByActionId: ' + e)
  }
}