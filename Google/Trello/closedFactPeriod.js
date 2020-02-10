/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject, AccountingItemArray) {
  var enableStackdriverLogging = true
  try {
    if (enableStackdriverLogging) console.time('closedFactPeriod')
    if (enableStackdriverLogging) console.log('closedFactPeriod STARTED')
    const globalVar = getVariable()
    var accountItems = getAccountingItem(AccountingItemArray).filter(function (row) {
      return row.fact == 1
    })
    var listFactId0 = getList(globalVar.boardIdFact0, postObject.cfo).id
    var listFactId = getList(globalVar.boardIdFact, postObject.cfo).id
    archiveAllCards(listFactId0)
    moveAllCards(listFactId, globalVar.boardIdFact0, listFactId0)
    var period0 = getPeriod(globalVar.boardIdFact0, postObject.cfo)
    var listNameFact0 = postObject.cfo + ' ' + formatterDate(period0.period)
    updateList(listFactId0, listNameFact0)
    var period = getPeriod(globalVar.boardIdFact, postObject.cfo)
    var listNameFact = postObject.cfo + ' ' + formatterDate(period.period)
    updateList(listFactId, listNameFact)
    //* создание карточек на листе факт и чеклистов в карточках
    var budget = getCurrData(getAllData(globalVar.targetSheetID, globalVar.targetSheetNameBudget), period.ymd)
    accountItems.forEach(function (accounts) {
      accounts.cardInfo = addCard(encodeData(accounts.nomenclature, '+'), listFactId)
      var card = accounts.cardInfo
      card.withBudget = budget.reduce(function (row, arrya) {
        if (arrya.cfo == postObject.cfo && card.name == arrya.nomenclature) {
          row += 1
        }
        return row
      }, 0)
      if (card.withBudget > 0) {
        card.checkListId = addCheckList(card.id, 'Бюджет').id
      }
      var budgetRow = budget.filter(function (arrya) {
        arrya.checkListId = card.checkListId
        return arrya.cfo == postObject.cfo && card.name == arrya.nomenclature && card.withBudget > 0
      })
      budgetRow.forEach(function (row) {
        addCheckListItem(row.checkListId, row.sum + ' ' + row.comment)
      })
    })
  } catch (e) {
    if (enableStackdriverLogging) console.error('ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log('closedFactPeriod ENDED')
    if (enableStackdriverLogging) console.timeEnd('closedFactPeriod')
  }
}