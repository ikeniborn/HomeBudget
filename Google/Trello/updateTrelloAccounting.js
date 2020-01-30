function updateTrelloAccounting(postObject, targetSheetID, targetSheetName) {

  var ss = SpreadsheetApp.openById(targetSheetID).getSheetByName(targetSheetName)
  var sourceSheetName
  var period
  if (postObject.boardName == sourceSheetNameFactTrello) {
    sourceSheetName = sourceSheetNameFactTrello
    period = getParametr(sourceSheetID, parametrSheetName, 'factPeriod').value
  } else if (postObject.boardName == sourceSheetNameBudgetTrello) {
    sourceSheetName = sourceSheetNameBudgetTrello
    period = getParametr(sourceSheetID, parametrSheetName, 'budgetPeriod').value
  }

  var maxDateTarget = getLastDateArray(targetSheetID, targetSheetName, sourceSheetNameFactTrello)
  var newData = postObject.filter(function (row) {
    return row.actionDate > new Date(maxDateTarget.getTime())
  })

  newData.forEach(function (data) {
    ss.appendRow([data.actionDate, period, data.listName, data.listName, data.bill, data.account, data.nomenclature, data.sum, data.comment, newData.actionId, sourceSheetName])
    // Проверка перевода на счет семьи
    if (data.account == 'Перевод на счет Семья') {
      var insertdate = new Date(data.actionDate.getTime() + 1000);
      if (data.listName == 'Илья') {
        ss.appendRow([insertdate, period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', data.sum, data.comment, newData.actionId, sourceSheetName])
      } else if (data.listName == 'Оксана') {
        ss.appendRow([insertdate, period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', data.sum, data.comment, newData.actionId, sourceSheetName])
      }
    }
  })
  // Удаление пустых строк
  var maxRows = ss.getMaxRows()
  var lastRow = ss.getLastRow()
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow)
  }
}