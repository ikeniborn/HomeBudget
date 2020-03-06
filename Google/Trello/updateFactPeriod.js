/* eslint-disable no-undef */
function updateFactPeriod(postObject) {
  try {
    var actionDate = postObject.actionDate
    var period = {}
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1)).date
      period.day = actionDate.getDate()
      updateParametr(postObject, 'periodFactIlya', period.period)
      updateParametr(postObject, 'revenueDayIlya', period.day)
    } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
      period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1)).date
      period.day = actionDate.getDate()
      updateParametr(postObject, 'periodFactOksana', period.period)
      updateParametr(postObject, 'revenueDayOksana', period.day)
    } else if (['Семья'].indexOf(postObject.listName) !== -1) {
      period.period = formatterDate(new Date(actionDate.getYear(), actionDate.getMonth(), 1)).date
      period.day = actionDate.getDate()
      updateParametr(postObject, 'periodFactFamily', period.period)
      updateParametr(postObject, 'revenueDayFamily', period.day)
    }
    postObject.parametrArray = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.parametrSheetName).getDataRange().getValues()
  } catch (e) {
    console.error('updateFactPeriod: ' + e)
  } finally {
    console.log('updateFactPeriod:complete')
  }
}