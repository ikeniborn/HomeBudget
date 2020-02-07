/* eslint-disable no-undef */
function updateFactPeriod(postObject) {
  var actionDate = postObject.actionDate
  var period = {}
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr('periodFactIlya', period.period)
    updateParametr('revenueDayIlya', period.day)
  } else if (['Оксана'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr('periodFactOksana', period.period)
    updateParametr('revenueDayOksana', period.day)
  } else if (['Семья'].indexOf(postObject.cfo) !== -1) {
    period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1))
    period.day = actionDate.getDate()
    updateParametr('periodFactFamily', period.period)
    updateParametr('revenueDayFamily', period.day)
  }
}