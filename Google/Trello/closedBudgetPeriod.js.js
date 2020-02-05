/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  var accountItems = getAccountingItem()
  //block создание новых карточек в бюджете
  updateBudgetPeriod(postObject)
  //block архивирование текущего бюджета
  var listBudget = getList(boardIdBudget, postObject.cfo).id
  closedList(listBudget)
  //block перенос бюджета +1 на текущий бюджет
  var period = getPeriod(boardIdBudget2, postObject.cfo).period
  var listBudget2 = getList(boardIdBudget2, postObject.cfo).id
  moveList(listBudget2, boardIdBudget)
  var listNameBudget = postObject.cfo + '' + formatterDate(period.period)
  updateList(listBudget2, listNameBudget)
  //block перенос бюджета +2 на текущий бюджет+1
  var period2 = getPeriod(boardIdBudget2, postObject.cfo).period
  var listBudget3 = getList(boardIdBudget2, postObject.cfo).id
  moveList(listBudget3, boardIdBudget2)
  var listNameBudget2 = postObject.cfo + '' + formatterDate(period2.period)
  updateList(listBudget3, listNameBudget2)
  //block добавление новый карточек на доску бюджет+2
  var period3 = getPeriod(boardIdBudget3, postObject.cfo).period
  var listNameBudget3 = postObject.cfo + '' + formatterDate(period3.period)
  var newListBudget3 = addList(listNameBudget3, boardIdBudget3)
  accountItems.forEach(function (accounts) {
    if (accounts.ilya == 1 && postObject.cfo == 'Илья') {
      addCard(accounts.nomenclature, newListBudget3.id)
    } else if (accounts.oksana == 1 && postObject.cfo == 'Оксана') {
      addCard(accounts.nomenclature, newListBudget3.id)
    }
  })
  //block обновление карточек семьи
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    //block архивирование текущего бюджета
    var listBudget = getList(boardIdBudget, 'Семья').id
    closedList(listBudget)
    //block перенос бюджета +1 на текущий бюджет
    var listBudget2 = getList(boardIdBudget2, 'Семья').id
    moveList(listBudget2, boardIdBudget)
    var listNameBudget = 'Семья ' + formatterDate(getPeriod(boardIdBudget, 'Семья').period)
    updateList(listBudget2, listNameBudget)
    //block перенос бюджета +2 на текущий бюджет+1
    var listBudget3 = getList(boardIdBudget3, 'Семья').id
    moveList(listBudget3, boardIdBudget2)
    var listNameBudget2 = 'Семья' + formatterDate(getPeriod(boardIdBudget, 'Семья').period)
    updateList(listBudget3, listNameBudget2)
    //block добавление новый карточек на лист в бюджет+2
    var period3 = getPeriod(boardIdBudget3, 'Семья').period
    var listNameBudget3 = 'Семья ' + formatterDate(period3)
    var newListBudget3 = addList(listNameBudget3, boardIdBudget3)
    accountItems.forEach(function (accounts) {
      if (accounts.family == 1 && postObject.cfo == 'Семья') {
        addCard(accounts.nomenclature, newListBudget3.id)
      }
    })
  }
}