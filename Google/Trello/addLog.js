function addLog(postData) {
  var globalVariable = getGlobalVariable()
  var sourceOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameLog)
  var endDate = new Date()
  var startDate = new Date()
  startDate.setDate(endDate.getDate() - 180)
  var deleteArrya = []
  var sourceArray = getGoogleSheetValues(sourceOpen).reduce(function (row, array, index) {
    if (index > 0) {
      if (array[0] >= startDate) {
        row.push(array)
      } else {
        deleteArrya.push(index + 1)
      }
    }
    return row
  }, [])
  if (deleteArrya.length > 0) {
    var startDeleteIndex = deleteArrya.reduce(function (a, b) {
      return a < b ? a : b
    })
    var countDeleteRow = deleteArrya.reduce(function (a, b) {
      return a > b ? a : b
    })
    sourceOpen.deleteRows(startDeleteIndex, countDeleteRow)
  }
  var isNewAction = sourceArray.reduce(function (row, array) {
    if (array[2].match(postData.action.id)) {
      row = false
    }
    return row
  }, true)
  if (isNewAction) {
    sourceOpen.appendRow([formatterDate().timestamp, postData.action.type, postData.action.id])
  }
  return isNewAction
}