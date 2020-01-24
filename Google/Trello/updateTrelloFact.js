function updateTrelloFact(postData) {
  // get sheet Google
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetNameFact)
  // get last date from source array
  var commentDate = new Date(postData.action.date)
  var userName = postData.action.memberCreator.username
  var listName = postData.action.data.list.name
  var nomenclatureName = postData.action.data.card.name
  var actionDataText = postData.action.data.text
  var sumData = actionDataText.match(/^\d+/)
  var commentData = actionDataText.split(sumData).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
  var period = []
  if (factPeriodPrev.length == 0) {
    period = factPeriodNow
  } else {
    if (listName !== 'Оксана') {
      if (currDate >= revenueDayIlya) {
        period = factPeriodNow
      } else {
        period = factPeriodPrev
      }
    } else {
      if (currDate >= revenueDayOksana) {
        period = factPeriodNow
      } else {
        period = factPeriodPrev
      }
    }
  }
  var dataDirItem = accountingItem.filter(function (row) {
    return row.nomenclature == nomenclatureName
  })
  var billName = dataDirItem[0].bill
  var itemName = dataDirItem[0].account

  ss.appendRow([commentDate, period, listName, listName, billName, itemName, nomenclatureName, +sumData, commentData, userName])
  // Обновление даты зарплаты
  if (itemName == 'Зарплата') {
    // обновление даты периода бюджета
    updateRevenueDate(sourceSheetID, periodSheetName, commentDate, listName)
  }
  // Удаление пустых строк
  var maxRows = ss.getMaxRows()
  var lastRow = ss.getLastRow()
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow)
  }
  return true
}