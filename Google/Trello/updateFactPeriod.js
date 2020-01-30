function updateFactPeriod(postObject) {
  const actionDate = postObject.actionDate
  if (postObject.account == 'Зарплата') {
    if (postObject.listName == 'Илья') {
      var newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
      var newFactPeriod0 = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth() - 1, 1))
      var revenueDay = actionDate.getDate()
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod-1', newFactPeriod0)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', revenueDay)
    }
  } else if (postObject.listName == 'Оксана') {
    var newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    var revenueDay = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'factPeriodOksana', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', revenueDay)
  }
}