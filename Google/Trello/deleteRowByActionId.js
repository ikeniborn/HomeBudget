function deleteRowByActionId(postObject) {
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
      sourceRows = sourceData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameFact)
      targetData = getCurrData(getAllData(postObject, postObject.targetSheetID, postObject.targetSheetNameFact), postObject.ymd)
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
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameBudgetTrello)
      sourceData = getCurrData(getAllData(postObject, postObject.sourceSheetID, postObject.sourceSheetNameBudgetTrello), postObject.ymd)
      var sourceRows = sourceData.reduce(function (row, array) {
        if (array.actionId == postObject.actionId) {
          row.push(array)
        }
        row.sort(function (a, b) {
          return b.indexRow - a.indexRow
        })
        return row
      }, [])
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameBudget)
      targetData = getCurrData(getAllData(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget), postObject.ymd)
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
  } catch (e) {
    console.error('deleteRowByActionId: ' + e)
  }
}