function getPeriod(boardId, listName) {
  var period
  var ymd
  var factPeriod
  var budgetPeriod
  if (listName == 'Илья') {
    factPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodFactIlya').value
    budgetPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodBudgetIlya').value
  } else if (listName == 'Семья') {
    factPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodFactFamily').value
    budgetPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodBudgetFamily').value
  } else if (listName == 'Оксана') {
    factPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodFactOksana').value
    budgetPeriod = getParametr(sourceSheetID, parametrSheetName, 'periodBudgetOksana').value
  }
  if (boardId == boardIdFact) {
    period = factPeriod
  } else if (boardId == boardIdFact0) {
    period = new Date(factPeriod.getYear(), factPeriod.getMonth() - 1, 1)
  } else if (boardId == boardIdBudget) {
    period = budgetPeriod
  } else if (boardId == boardIdBudget2) {
    period = new Date(budgetPeriod.getYear(), budgetPeriod.getMonth() + 1, 1)
  } else if (boardId == boardIdBudget3) {
    period = new Date(budgetPeriod.getYear(), budgetPeriod.getMonth() + 2, 1)
  }

  ymd = getYMD(period).ymd
  return {
    period: period,
    ymd: ymd,
    factPeriod: factPeriod,
    budgetPeriod: budgetPeriod
  }
}