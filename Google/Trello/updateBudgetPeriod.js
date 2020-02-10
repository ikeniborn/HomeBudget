function updateBudgetPeriod(postObject) {
  var factPeriod
  var newBudgetPeriod
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    factPeriod = getPeriod(globalVar, postObject.boardId, postObject.cfo).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr(globalVar, 'periodBudgetIlya', newBudgetPeriod)
    updateParametr(globalVar, 'periodBudgetFamily', newBudgetPeriod)
  } else if (['Оксана'].indexOf(postObject.cfo) !== -1) {
    factPeriod = getPeriod(globalVar, postObject.boardId, postObject.cfo).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr(globalVar, 'periodBudgetOksana', newBudgetPeriod)
  }

}