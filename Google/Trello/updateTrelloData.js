function updateTrelloData(postObject) {
  try {
    var ss
    var sourceSheetName
    var ts
    var targetSheetName
    var insertdate
    //* определение истоников
    if (postObject.isFact) {
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameFactTrello)
      sourceSheetName = postObject.sourceSheetNameFactTrello
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameFact)
      targetSheetName = postObject.targetSheetNameFact
    } else if (postObject.isBudget) {
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameBudgetTrello)
      sourceSheetName = postObject.sourceSheetNameBudgetTrello
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameBudget)
      targetSheetName = postObject.targetSheetNameBudget
    } else if (postObject.isTarget) {
      ss = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.sourceSheetNameTargetTrello)
      sourceSheetName = postObject.sourceSheetNameBudgetTrello
      ts = SpreadsheetApp.openById(postObject.targetSheetID).getSheetByName(postObject.targetSheetNameFact)
      targetSheetName = postObject.targetSheetNameBudget
    }
    //* вставка значений в буфер
    ss.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId])
    //* вставка значений в учет
    if (postObject.account == 'Остатки') {
      var newPeriod = postObject.budgetPeriod
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      ts.appendRow([insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    } else {
      ts.appendRow([postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
    }
    //* Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        ts.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      } else if (postObject.cfo == 'Оксана') {
        ts.appendRow([insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName])
      }
    }
    //* Удаление пустых строк
    deleteEmptyRow(postObject.sourceSheetID, sourceSheetName)
    //* Удаление пустых строк
    deleteEmptyRow(postObject.targetSheetID, targetSheetName)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  }
}