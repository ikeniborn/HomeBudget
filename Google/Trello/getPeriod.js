function getPeriod(postObject) {
  try {
    var date = {}
    if (postObject.cfo == 'Илья') {
      date.factPeriod = getParametr(postObject, 'periodFactIlya').item.value
      date.budgetPeriod = getParametr(postObject, 'periodBudgetIlya').item.value
    } else if (postObject.cfo == 'Семья') {
      date.factPeriod = getParametr(postObject, 'periodFactFamily').item.value
      date.budgetPeriod = getParametr(postObject, 'periodBudgetFamily').item.value
    } else if (postObject.cfo == 'Оксана') {
      date.factPeriod = getParametr(postObject, 'periodFactOksana').item.value
      date.budgetPeriod = getParametr(postObject, 'periodBudgetOksana').item.value
    }
    if (postObject.boardId == postObject.boardIdFact) {
      date.period = date.factPeriod
    } else if (postObject.boardId == postObject.boardIdFact0) {
      date.period = new Date(date.factPeriod.getYear(), date.factPeriod.getMonth() - 1, 1)
    } else if (postObject.boardId == postObject.boardIdBudget) {
      date.period = date.budgetPeriod
    } else if (postObject.boardId == postObject.boardIdBudget2) {
      date.period = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 1, 1)
    } else if (postObject.boardId == postObject.boardIdBudget3) {
      date.period = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 2, 1)
    }
    date.factPeriod0 = new Date(date.factPeriod.getYear(), date.factPeriod.getMonth() - 1, 1)
    date.budgetPeriod2 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 1, 1)
    date.budgetPeriod3 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 2, 1)
    date.ymd = getYMD(date.period).ymd
    if (getYMD(date.factPeriod).ymd == getYMD(date.budgetPeriod).ymd) {
      date.isSamePeriod = true
    } else {
      date.isSamePeriod = false
    }
    return date
  } catch (e) {
    console.error('getPeriod: ' + e)
  }
}