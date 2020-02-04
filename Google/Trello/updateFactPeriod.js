function updateFactPeriod(postObject) {
  var actionDate = postObject.actionDate
  var period = {}
  if (['Илья'].indexOf(postObject.listName) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactIlya', period.period)
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactFamily', period.period)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', period.day)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayFamily', period.day)
  } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr(sourceSheetID, parametrSheetName, 'periodFactOksana', period.period)
    updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', period.day)
  }
}