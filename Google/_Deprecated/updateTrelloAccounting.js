function updateTrelloAccounting(postObject) {
  try {
    var targetSheetName
    var sourceSheetName
    var insertdate
    if (postObject.isFact) {
      targetSheetName = postObject.targetSheetNameFact
      sourceSheetName = postObject.sourceSheetNameFactTrello
    } else {
      targetSheetName = postObject.targetSheetNameBudget
      sourceSheetName = postObject.sourceSheetNameBudgetTrello
    }
    var ss = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(targetSheetName)
    if (postObject.account == 'Остатки') {
      var newPeriod = getPeriod(postObject, globalVar.boardIdBudget).period
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
    deleteEmptyRow(postObject.targetSheetID, targetSheetName)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  }
}