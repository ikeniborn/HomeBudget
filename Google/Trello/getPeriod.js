function getPeriod(boardId, listName) {
  var globalVar = getVariable()
  var period
  var ymd
  var factPeriod
  var budgetPeriod
  if (listName == 'Илья') {
    factPeriod = getParametr('periodFactIlya').value
    budgetPeriod = getParametr('periodBudgetIlya').value
  } else if (listName == 'Семья') {
    factPeriod = getParametr('periodFactFamily').value
    budgetPeriod = getParametr('periodBudgetFamily').value
  } else if (listName == 'Оксана') {
    factPeriod = getParametr('periodFactOksana').value
    budgetPeriod = getParametr('periodBudgetOksana').value
  }
  if (boardId == globalVar.boardIdFact) {
    period = factPeriod
  } else if (boardId == globalVar.boardIdFact0) {
    period = new Date(factPeriod.getYear(), factPeriod.getMonth() - 1, 1)
  } else if (boardId == globalVar.boardIdBudget) {
    period = budgetPeriod
  } else if (boardId == globalVar.boardIdBudget2) {
    period = new Date(budgetPeriod.getYear(), budgetPeriod.getMonth() + 1, 1)
  } else if (boardId == globalVar.boardIdBudget3) {
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