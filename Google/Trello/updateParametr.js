// обновление параметра
function updateParametr(postObject, value) {
  /*
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.parametrSheetOpen
    var indexRow = getParametr(postObject).item.indexRow
    ss.getRange(indexRow, 4).setValue(value)
    ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
  } catch (e) {
    console.error('updateParametr: ' + e)
  }
}