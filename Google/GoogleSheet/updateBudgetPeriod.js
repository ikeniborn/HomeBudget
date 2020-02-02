function updateBudgetPeriod(postObject) {
  var factPeriod
  var newBudgetPeriod
  if (['Илья'].indexOf(postObject.listName) !== -1) {
    factPeriod = getPeriod(postObject.boardId, postObject.listName).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr(sourceSheetID, parametrSheetName, 'periodBudgetIlya', newBudgetPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'periodBudgetFamily', newBudgetPeriod)
  } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
    factPeriod = getPeriod(postObject.boardId, postObject.listName).factPeriod
    newBudgetPeriod = formatterDate(new Date(factPeriod.getYear(), factPeriod.getMonth() + 1, 1))
    updateParametr(sourceSheetID, parametrSheetName, 'periodBudgetOksana', newBudgetPeriod)
  }

}