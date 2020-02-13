/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(globalVar, postObject) {
  var accountItems = getAccountingItem(globalVar.accountingItemArray).filter(function (row) {
    return row.budget == 1
  })
  //block создание новых карточек в бюджете
  updateBudgetPeriod(postObject)
  //block архивирование текущего бюджета
  var listBudget = getList(globalVar.boardIdBudget, postObject.cfo).id
  closedList(globalVar, listBudget)
  //block перенос бюджета +1 на текущий бюджет
  var period = getPeriod(globalVar, globalVar.boardIdBudget2, postObject.cfo).period
  var listBudget2 = getList(globalVar, globalVar.boardIdBudget2, postObject.cfo).id
  moveList(globalVar, listBudget2, globalVar.boardIdBudget)
  var listNameBudget = postObject.cfo + '' + formatterDate(period.period).date
  updateList(globalVar, listBudget2, listNameBudget)
  //block перенос бюджета +2 на текущий бюджет+1
  var period2 = getPeriod(globalVar, globalVar.boardIdBudget2, postObject.cfo).period
  var listBudget3 = getList(globalVar, globalVar.boardIdBudget2, postObject.cfo).id
  moveList(globalVar, listBudget3, globalVar.boardIdBudget2)
  var listNameBudget2 = postObject.cfo + '' + formatterDate(period2.period).date
  updateList(globalVar, listBudget3, listNameBudget2)
  //block добавление новый карточек на доску бюджет+2
  var period3 = getPeriod(globalVar, globalVar.boardIdBudget3, postObject.cfo).period
  var listNameBudget3 = postObject.cfo + '' + formatterDate(period3.period).date
  var newListBudget3 = addList(globalVar, listNameBudget3, globalVar.boardIdBudget3)
  accountItems.forEach(function (accounts) {
    if (accounts.ilya == 1 && postObject.cfo == 'Илья') {
      addCard(globalVar, accounts.nomenclature, newListBudget3.id)
    } else if (accounts.oksana == 1 && postObject.cfo == 'Оксана') {
      addCard(globalVar, accounts.nomenclature, newListBudget3.id)
    }
  })
}