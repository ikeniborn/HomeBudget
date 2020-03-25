function getPeriod(postObject) {
  try {
    var date = {}
    if (postObject.isFact || postObject.isTarget) {
      var postObjectBudget = copyObject(postObject)
      postObjectBudget.type = 'Бюджет'
      date.factPeriod = getParametr(postObject).item.value
      date.budgetPeriod = getParametr(postObjectBudget).item.value
      date.factPeriod0 = new Date(date.factPeriod.getYear(), date.factPeriod.getMonth() - 1, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 2, 1)
    } else if (postObject.isBudget) {
      var postObjectFact = copyObject(postObject)
      postObjectFact.type = 'Факт'
      date.factPeriod = getParametr(postObjectFact).item.value
      date.budgetPeriod = getParametr(postObject).item.value
      date.factPeriod0 = new Date(date.factPeriod.getYear(), date.factPeriod.getMonth() - 1, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getYear(), date.budgetPeriod.getMonth() + 2, 1)
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