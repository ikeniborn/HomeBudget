function updateTrelloAccounting(globalVar, postObject, boardId) {
  var targetSheetName
  var sourceSheetName
  if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(boardId) !== -1) {
    targetSheetName = globalVar.targetSheetNameFact
    sourceSheetName = globalVar.sourceSheetNameFactTrello
  } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(boardId) !== -1) {
    targetSheetName = globalVar.targetSheetNameBudget
    sourceSheetName = globalVar.sourceSheetNameBudgetTrello
  }
  var targetArray = getCurrData(getAllData(globalVar, globalVar.targetSheetID, targetSheetName), postObject.period)
  var searchRow = targetArray.filter(function (row) {
    return row.actionId == postObject.actionId
  })
  if (searchRow.length == 0) {
    var ss = SpreadsheetApp.openById(globalVar.targetSheetID).getSheetByName(targetSheetName)
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    // Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      var insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      } else if (postObject.cfo == 'Оксана') {
        ss.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      }
    }
    if (postObject.account == 'Остатки') {
      var newPeriod = getPeriod(globalVar, globalVar.boardIdBudget, postObject.cfo).period
      var insertdate = new Date(postObject.actionDate.getTime() + 1000);
      ss.appendRow([insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    }
  }
  // Удаление пустых строк
  deleteEmptyRow(globalVar.targetSheetID, targetSheetName)
}