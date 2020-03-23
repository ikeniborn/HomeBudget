function addLog(postObject) {
  var sourceOpen = postObject.logOpen
  var endDate = new Date()
  var startDate = new Date()
  startDate.setDate(endDate.getDate() - 180)
  var deleteArrya = []
  var sourceArray = postObject.logArray.reduce(function (row, array, index) {
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
    if (array[2] !== postObject.webHookActionId) {
      row = true
    }
    return row
  }, false)
  if (isNewAction) {
    sourceOpen.appendRow([postObject.webHookDate, postObject.actionType, postObject.webHookActionId])
  }
  return isNewAction
}