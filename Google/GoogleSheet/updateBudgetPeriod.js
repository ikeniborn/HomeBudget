function updateBudgetPeriod(postObject) {
  var factPeriod
  var newBudgetPeriod
  if (postObject.account == 'Аванс') {
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      factPeriod = getPeriod(postObject.boardId, postObject.listName).factPeriod
      newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodIlya', newBudgetPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodFamily', newBudgetPeriod)
    } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
      factPeriod = getPeriod(postObject.boardId, postObject.listName).factPeriod
      newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodOksana', newBudgetPeriod)
    }
  }
}