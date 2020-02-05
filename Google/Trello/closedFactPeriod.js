/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  updateFactPeriod(postObject)
  var accountItems = getAccountingItem()
  //block архивирование факта прошлого периода
  var listFactId0 = getList(boardIdFact0, postObject.cfo).id
  closedList(listFactId0)
  //block перенос факта в прошлый период
  var period0 = getPeriod(boardIdFact0, postObject.cfo).period
  var listFactId = getList(boardIdFact, postObject.cfo).id
  moveList(listFactId, boardIdFact0)
  var listNameFact = postObject.cfo + '' + formatterDate(period0)
  updateList(listFactId, listNameFact)
  //DOING создание новых листов, карточек в текущий факт и обогащение данными из бюджета
  var period = getPeriod(boardIdBudget, postObject.cfo)
  var newListNameFact = postObject.cfo + '' + formatterDate(period.period)
  var newListFact = addList(newListNameFact, boardIdFact)
  //block создание карточек на листе
  var newCardCfo = []
  var cardInfo = {}
  accountItems.forEach(function (accounts) {
    if (accounts.ilya == 1 && postObject.cfo == 'Илья') {
      cardInfo = addCard(accounts.nomenclature, newListFact.id)
      cardInfo.checkListId = addCheckList(cardInfo.id, 'Бюджет').id
      newCardCfo.push(cardInfo)
    } else if (accounts.oksana == 1 && postObject.cfo == 'Оксана') {
      cardInfo = addCard(accounts.nomenclature, newListFact.id)
      cardInfo.checkListId = addCheckList(cardInfo.id, 'Бюджет').id
      newCardCfo.push(cardInfo)
    }
  })
  //block создание чеклистов по бюджету
  var currBudget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
  var currBudgetCfo = currBudget.filter(function (row) {
    return currBudget.cfo = postObject.cfo
  })
  // currBudgetCfo.forEach(function (row) {
  //   if (newCardCfo.name == row.nomenclature) {
  //     addCheckListItem(newCardCfo.checkListId, row.sum + '' + row.comment)
  //   }
  // })
  //block обновление семейных карточек
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    //block архивирование факта прошлого периода
    var listFact0 = getList(boardIdFact0, 'Семья').id
    closedList(listFact0)
    //block перенос факта в прошлый период
    var period0 = getPeriod(boardIdFact0, postObject.cfo).period
    var listFact = getList(boardIdFact, Семья).id
    moveList(listFact, boardIdFact0)
    var listNameFact = 'Семья ' + formatterDate(period0.period)
    updateList(listFact, listNameFact)
  }
}