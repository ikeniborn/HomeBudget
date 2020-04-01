// обновление параметра
function updateParametr(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.parametrSheetOpen
    var indexRow
    var value
    const postObjectCopy = copyObject(postObject)
    if (['Остатки'].indexOf(postObject.account) !== -1) {
      ['Цель', 'Факт'].for(function (type) {
        postObjectCopy.type = type
        indexRow = getParametr(postObjectCopy).item.indexRow
        value = new Date(postObjectCopy.factPeriod.getFullYear(), postObjectCopy.factPeriod.getMonth() + 1, 1)
        ss.getRange(indexRow, 4).setValue(formatterDate(value).date)
        ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
      })
    } else if (['Аванс'].indexOf(postObject.account) !== -1) {
      postObjectCopy.isFact = false
      postObjectCopy.isBudget = true
      postObjectCopy.type = 'Бюджет'
      indexRow = getParametr(postObjectCopy).item.indexRow
      value = new Date(postObjectCopy.budgetPeriod.getFullYear(), postObjectCopy.budgetPeriod.getMonth() + 1, 1)
      ss.getRange(indexRow, 4).setValue(formatterDate(value).date)
      ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
    }
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