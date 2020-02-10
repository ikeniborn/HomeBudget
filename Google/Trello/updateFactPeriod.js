/* eslint-disable no-undef */
function updateFactPeriod(globalVar, postObject) {
  var actionDate = postObject.actionDate
  var period = {}
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr(globalVar, 'periodFactIlya', period.period)
    updateParametr(globalVar, 'revenueDayIlya', period.day)
  } else if (['Оксана'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr(globalVar, 'periodFactOksana', period.period)
    updateParametr(globalVar, 'revenueDayOksana', period.day)
  } else if (['Семья'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr(globalVar, 'periodFactFamily', period.period)
    updateParametr(globalVar, 'revenueDayFamily', period.day)
  }
}