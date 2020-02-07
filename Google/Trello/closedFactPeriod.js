/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject, AccountingItemArray) {
  var enableStackdriverLogging = true
  try {
    if (enableStackdriverLogging) console.time('closedFactPeriod')
    if (enableStackdriverLogging) console.log('closedFactPeriod STARTED')
    var globalVar = getVariable()
    var accountItems = AccountingItemArray.filter(function (row) {
      return row.fact == 1
    })
    if (enableStackdriverLogging) console.log('Статьи для карточек - ' + accountItems)
    var listFactId0 = getList(globalVar.boardIdFact0, postObject.cfo).id
    var listFactId = getList(globalVar.boardIdFact, postObject.cfo).id
    if (enableStackdriverLogging) console.log('listFactId0 - ' + listFactId0)
    if (enableStackdriverLogging) console.log('listFactId - ' + listFactId)
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
    if (enableStackdriverLogging) console.log('Получение бюджета-' + budget)
    if (enableStackdriverLogging) console.log('Создание новых карточек')
    accountItems.forEach(function (accounts) {
      accounts.cardInfo = addCard(encodeData(accounts.nomenclature, '+'), listFactId)
      var card = accounts.cardInfo
      if (enableStackdriverLogging) console.log('Новая карточка - ' + card)
      card.withBudget = budget.reduce(function (row, arrya) {
        if (arrya.cfo == postObject.cfo && card.name == arrya.nomenclature) {
          row += 1
        }
        return row
      }, 0)
      if (enableStackdriverLogging) console.log('Проверка на наличие бюджета - ' + card.withBudget)
      if (card.withBudget > 0) {
        if (enableStackdriverLogging) console.log('Создание чеклиста')
        card.checkListId = addCheckList(cardInfo.id, 'Бюджет').id
        if (enableStackdriverLogging) console.log('Чек лист - ' + card.checkListId)
      }

      var budgetRow = budget.reduce(function (row, arrya) {
        if (arrya.cfo == postObject.cfo && card.name == arrya.nomenclature) {
          arrya.checkListId = cardInfo.card
          row.push(arrya)
        }
        return row
      }, [])
      if (enableStackdriverLogging) console.log('Бюджетные строки- ' + budgetRow)
      budgetRow.forEach(function (row) {
        if (enableStackdriverLogging) console.log('Создание элементов чеклиста')
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