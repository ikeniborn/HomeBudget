// обновление параметра
function updateParametr(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.parametrSheetOpen
    var indexRow = getParametr(postObject).item.indexRow
    var value = new Date(postObject.budgetPeriod.getYear(), postObject.budgetPeriod.getMonth() + 1, 1)
    ss.getRange(indexRow, 4).setValue(formatterDate(value).date)
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