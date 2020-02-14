function updateTrelloAccounting(globalVar, postObject, boardId) {
  var targetSheetName
  var sourceSheetName
  var insertdate
  if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(boardId) !== -1) {
    targetSheetName = globalVar.targetSheetNameFact
    sourceSheetName = globalVar.sourceSheetNameFactTrello
  } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(boardId) !== -1) {
    targetSheetName = globalVar.targetSheetNameBudget
    sourceSheetName = globalVar.sourceSheetNameBudgetTrello
  }
  var ss = SpreadsheetApp.openById(globalVar.targetSheetID).getSheetByName(targetSheetName)
  if (postObject.account == 'Остатки') {
    var newPeriod = getPeriod(globalVar, globalVar.boardIdBudget, postObject.cfo).period
    insertdate = new Date(postObject.actionDate.getTime() + 1000);
    ss.appendRow([insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
  } else {
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
  }
  // Проверка перевода на счет семьи
  if (postObject.account == 'Перевод на счет Семья') {
    insertdate = new Date(postObject.actionDate.getTime() + 1000);
    if (postObject.cfo == 'Илья') {
      ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    } else if (postObject.cfo == 'Оксана') {
      ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    }
  }

  // Удаление пустых строк
  deleteEmptyRow(globalVar.targetSheetID, targetSheetName)
}