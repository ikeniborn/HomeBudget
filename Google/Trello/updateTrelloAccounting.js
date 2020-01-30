function updateTrelloAccounting(postObject, targetSheetID, targetSheetName) {

  var ss = SpreadsheetApp.openById(targetSheetID).getSheetByName(targetSheetName)
  var sourceSheetName
  if (postObject.boardName == targetSheetNameFact) {
    sourceSheetName = sourceSheetNameFactTrello
  } else if (postObject.boardName == targetSheetNameBudget) {
    sourceSheetName = sourceSheetNameBudgetTrello
  }

  var maxDateTarget = getLastDateArray(targetSheetID, targetSheetName, sourceSheetNameFactTrello)

  if (postObject.actionDate > new Date(maxDateTarget.getTime())) {
    ss.appendRow([postObject.actionDate, postObject.period, postObject.listName, postObject.listName, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    // Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      var insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.listName == 'Илья') {
        ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      } else if (postObject.listName == 'Оксана') {
        ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      }
    }
  }
  // Удаление пустых строк
  var maxRows = ss.getMaxRows()
  var lastRow = ss.getLastRow()
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow)
  }
}