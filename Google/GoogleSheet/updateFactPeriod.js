function updateFactPeriod(postObject) {
  var actionDate = postObject.actionDate
  var revenueDay
  var newFactPeriod
  if (['Илья'].indexOf(postObject.listName) !== -1) {
    newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    revenueDay = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactIlya', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactFamily', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', revenueDay)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayFamily', revenueDay)
  } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
    newFactPeriod = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    revenueDay = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactOksana', newFactPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', revenueDay)
  }
}