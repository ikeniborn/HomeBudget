function addError(postObject) {
  let errorOpen = postObject.errorOpen
  let startDate = getPreviousDate(180)
  let deleteArrya = postObject.errorArray.reduce(function (row, array, index) {
    if (index > 0) {
      if (array[0] <= startDate) {
        row.push(array)
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
    errorOpen.deleteRows(startDeleteIndex, countDeleteRow)
  }
  errorOpen.appendRow([postObject.webHookDate, postObject.actionType, postObject.webHookActionId, postObject.actionId, postObject.error])
}