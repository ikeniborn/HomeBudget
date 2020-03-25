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
    postObject.parametrArray = getGoogleSheetValues(postObject.parametrSheetOpen)
    postObject.date = getPeriod(postObject)
    postObject.period = postObject.date.period
    postObject.ymd = postObject.date.ymd
    postObject.factPeriod0 = postObject.date.factPeriod0
    postObject.factPeriod = postObject.date.factPeriod
    postObject.budgetPeriod = postObject.date.budgetPeriod
    postObject.budgetPeriod2 = postObject.date.budgetPeriod2
    postObject.budgetPeriod3 = postObject.date.budgetPeriod3
  } catch (e) {
    console.error('updateParametr: ' + e)
  }
}