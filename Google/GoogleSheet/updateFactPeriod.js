function updateFactPeriod(postObject) {
  var actionDate = postObject.actionDate
  var revenueDay
  var newFactPeriod
  if (postObject.account == 'Зарплата') {
    if (postObject.listName == 'Илья') {
      newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
      revenueDay = actionDate.getDate()
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', revenueDay)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayFamily', revenueDay)
    }
  } else if (postObject.listName == 'Оксана') {
    newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    revenueDay = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'factPeriodOksana', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', revenueDay)
  }
}