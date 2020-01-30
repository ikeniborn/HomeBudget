function updateFactPeriod(postObject) {
  const actionDate = postObject.actionDate
  var revenueDay
  var newFactPeriod
  var newFactPeriod0
  if (postObject.account == 'Зарплата') {
    if (postObject.listName == 'Илья') {
      newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
      newFactPeriod0 = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth() - 1, 1))
      revenueDay = actionDate.getDate()
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod-1', newFactPeriod0)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', revenueDay)
    }
  } else if (postObject.listName == 'Оксана') {
    newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    revenueDay = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'factPeriodOksana', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', revenueDay)
  }
}