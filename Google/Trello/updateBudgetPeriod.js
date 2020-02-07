function updateBudgetPeriod(postObject) {
  var factPeriod
  var newBudgetPeriod
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    factPeriod = getPeriod(postObject.boardId, postObject.cfo).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr('periodBudgetIlya', newBudgetPeriod)
    updateParametr('periodBudgetFamily', newBudgetPeriod)
  } else if (['Оксана'].indexOf(postObject.cfo) !== -1) {
    factPeriod = getPeriod(postObject.boardId, postObject.cfo).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr('periodBudgetOksana', newBudgetPeriod)
  }

}