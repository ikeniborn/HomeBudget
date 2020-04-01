// обновление параметра
function updateTarget(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.goalsSheetOpen
    var indexRow
    indexRow = getTarget(postObject).item.indexRow
    ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
    ss.getRange(indexRow, 7).setValue('closed')
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}