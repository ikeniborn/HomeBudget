function getPeriod(globalVar, boardId, listName) {
  var period
  var ymd
  var factPeriod
  var budgetPeriod
  if (listName == 'Илья') {
    factPeriod = getParametr(globalVar.parametrArray, 'periodFactIlya').value
    budgetPeriod = getParametr(globalVar.parametrArray, 'periodBudgetIlya').value
  } else if (listName == 'Семья') {
    factPeriod = getParametr(globalVar.parametrArray, 'periodFactFamily').value
    budgetPeriod = getParametr(globalVar.parametrArray, 'periodBudgetFamily').value
  } else if (listName == 'Оксана') {
    factPeriod = getParametr(globalVar.parametrArray, 'periodFactOksana').value
    budgetPeriod = getParametr(globalVar.parametrArray, 'periodBudgetOksana').value
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
    ymd: ymd
  }
}