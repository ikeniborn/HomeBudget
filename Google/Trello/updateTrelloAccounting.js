function updateTrelloAccounting(postObject, boardId) {
  var targetSheetID = targetSheetID
  var sourceSheetName
  if ([boardIdFact, boardIdFact0].indexOf(boardId) !== -1) {
    targetSheetName = targetSheetNameFact
    sourceSheetName = sourceSheetNameFactTrello
  } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(boardId) !== -1) {
    targetSheetName = targetSheetNameBudget
    sourceSheetName = sourceSheetNameBudgetTrello
  }

  var ss = SpreadsheetApp.openById(targetSheetID).getSheetByName(targetSheetName)

  var maxDateTarget = getLastDateArray(targetSheetID, targetSheetName, sourceSheetName)

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
  deleteEmptyRow(targetSheetID, targetSheetName)
}