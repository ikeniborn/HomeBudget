/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject, AccountingItemArray) {
  var globalVar = getVariable()
  var accountItems = getAccountingItem(AccountingItemArray).filter(function (row) {
    return row.budget == 1
  })
  //block создание новых карточек в бюджете
  updateBudgetPeriod(postObject)
  //block архивирование текущего бюджета
  var listBudget = getList(globalVar.boardIdBudget, postObject.cfo).id
  closedList(listBudget)
  //block перенос бюджета +1 на текущий бюджет
  var period = getPeriod(globalVar.boardIdBudget2, postObject.cfo).period
  var listBudget2 = getList(globalVar.boardIdBudget2, postObject.cfo).id
  moveList(listBudget2, globalVar.boardIdBudget)
  var listNameBudget = postObject.cfo + '' + formatterDate(period.period)
  updateList(listBudget2, listNameBudget)
  //block перенос бюджета +2 на текущий бюджет+1
  var period2 = getPeriod(globalVar.boardIdBudget2, postObject.cfo).period
  var listBudget3 = getList(globalVar.boardIdBudget2, postObject.cfo).id
  moveList(listBudget3, globalVar.boardIdBudget2)
  var listNameBudget2 = postObject.cfo + '' + formatterDate(period2.period)
  updateList(listBudget3, listNameBudget2)
  //block добавление новый карточек на доску бюджет+2
  var period3 = getPeriod(globalVar.boardIdBudget3, postObject.cfo).period
  var listNameBudget3 = postObject.cfo + '' + formatterDate(period3.period)
  var newListBudget3 = addList(listNameBudget3, globalVar.boardIdBudget3)
  accountItems.forEach(function (accounts) {
    if (accounts.ilya == 1 && postObject.cfo == 'Илья') {
      addCard(accounts.nomenclature, newListBudget3.id)
    } else if (accounts.oksana == 1 && postObject.cfo == 'Оксана') {
      addCard(accounts.nomenclature, newListBudget3.id)
    }
  })
}