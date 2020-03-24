function getPeriod(postObject) {
  try {
    var date = {}
    var parametr = getParametr(postObject).item.value
    if (postObject.isFact || postObject.isTarget) {
      date.factPeriod0 = new Date(parametr.getYear(), parametr.getMonth() - 1, 1)
      date.factPeriod = parametr
      date.budgetPeriod = new Date(parametr.getYear(), parametr.getMonth() + 1, 1)
      date.budgetPeriod2 = new Date(parametr.getYear(), parametr.getMonth() + 2, 1)
      date.budgetPeriod3 = new Date(parametr.getYear(), parametr.getMonth() + 3, 1)
    } else if (postObject.isBudget) {
      date.factPeriod0 = new Date(parametr.getYear(), parametr.getMonth() - 2, 1)
      date.factPeriod = new Date(parametr.getYear(), parametr.getMonth() - 1, 1)
      date.budgetPeriod = parametr
      date.budgetPeriod2 = new Date(parametr.getYear(), parametr.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(parametr.getYear(), parametr.getMonth() + 2, 1)
    }
    if (postObject.boardId == postObject.boardIdFact) {
      date.period = date.factPeriod
    } else if (postObject.boardId == postObject.boardIdFact0) {
      date.period = date.factPeriod0
    } else if (postObject.boardId == postObject.boardIdBudget) {
      date.period = date.budgetPeriod
    } else if (postObject.boardId == postObject.boardIdBudget2) {
      date.period = date.budgetPeriod2
    } else if (postObject.boardId == postObject.boardIdBudget3) {
      date.period = date.budgetPeriod3
    }
    date.ymd = getYMD(date.period).ymd
    return date
  } catch (e) {
    console.error('getPeriod: ' + e)
  }
}