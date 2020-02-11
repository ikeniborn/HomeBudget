/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(globalVar, postObject, AccountingItemArray) {
  var accountItems = getAccountingItem(AccountingItemArray).filter(function (row) {
    return row.fact == 1
  })
  //* закрытие исторического листа
  var listFactId0 = getList(globalVar, globalVar.boardIdFact0, postObject.cfo).id
  closedList(globalVar, listFactId0)
  var listFactId = postObject.listId
  //* копирование текущего факта и перенос на доску истории
  var period0 = getPeriod(globalVar, globalVar.boardIdFact0, postObject.cfo)
  var listNameFact0 = postObject.cfo + ' ' + formatterDate(period0.period)
  var listFactIdCopy = copyList(globalVar, listNameFact0, postObject.boardId, listFactId).id
  moveList(globalVar, listFactIdCopy, globalVar.boardIdFact0)
//* обновление текущего листа факта
  var period = getPeriod(globalVar, globalVar.boardIdFact, postObject.cfo)
  var listNameFact = postObject.cfo + ' ' + formatterDate(period.period)
  updateList(globalVar, listFactId, listNameFact)
  archiveAllCards(globalVar, listFactId)
  //* создание карточек на листе факт и чеклистов в карточках
  var budget = getCurrData(getAllData(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameBudget), period.ymd)
  accountItems.forEach(function (accounts) {
    accounts.cardInfo = addCard(globalVar, encodeData(accounts.nomenclature, '+'), listFactId)
    var card = accounts.cardInfo
    card.withBudget = budget.reduce(function (row, arrya) {
      if (arrya.cfo == postObject.cfo && card.name == arrya.nomenclature) {
        row += 1
      }
      return row
    }, 0)
    if (card.withBudget > 0) {
      card.checkListId = addCheckList(globalVar, card.id, 'Бюджет').id
    }
    var budgetRow = budget.filter(function (arrya) {
      arrya.checkListId = card.checkListId
      return arrya.cfo == postObject.cfo && card.name == arrya.nomenclature && card.withBudget > 0
    })
    budgetRow.forEach(function (row) {
      addCheckListItem(globalVar, row.checkListId, row.sum + ' ' + row.comment)
    })
  })
}