function getPeriod(postObject, boardId) {
  try {
    var date = {}
    if (postObject.listName == 'Илья') {
      date.factPeriod = getParametr(postObject.parametrArray, 'periodFactIlya').value
      date.budgetPeriod = getParametr(postObject.parametrArray, 'periodBudgetIlya').value
    } else if (postObject.listName == 'Семья') {
      date.factPeriod = getParametr(postObject.parametrArray, 'periodFactFamily').value
      date.budgetPeriod = getParametr(postObject.parametrArray, 'periodBudgetFamily').value
    } else if (postObject.listName == 'Оксана') {
      date.factPeriod = getParametr(postObject.parametrArray, 'periodFactOksana').value
      date.budgetPeriod = getParametr(postObject.parametrArray, 'periodBudgetOksana').value
    }
    if (boardId == postObject.boardIdFact) {
      date.period = date.factPeriod
    } else if (boardId == postObject.boardIdFact0) {
      date.period = new Date(date.factPeriod.getYear(), date.factPeriod.getMonth() - 1, 1)
    } else if (boardId == postObject.boardIdBudget) {
      date.period = date.budgetPeriod
    } else if (boardId == postObject.boardIdBudget2) {
      date.period = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 1, 1)
    } else if (boardId == postObject.boardIdBudget3) {
      date.period = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 2, 1)
    }
    date.ymd = getYMD(date.period).ymd
    return date
  } catch (e) {
    console.error('getPeriod: ' + e)
  }
}