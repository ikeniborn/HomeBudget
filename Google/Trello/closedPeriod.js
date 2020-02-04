/* eslint-disable spaced-comment */
function closedPeriod(postObject) {
  if (postObject.account == 'Зарплата') {
    updateFactPeriod(postObject)
    //block архивирование факта прошлого периода
    var listFact0 = getList(boardIdFact0, postObject.listName).id
    closedList(listFact0)
    //block перенос факта в прошлый период
    var period0 = getPeriod(boardIdFact0, postObject.listName).period
    var listFact = getList(boardIdFact, postObject.listName)
    moveList(listFact.id, boardIdFact0)
    var listNameFact = postObject.listName + '' + formatterDate(period0)
    updateList(listFact, listNameFact)
    var accountItems = getAccountingItem(nomenclature)
    //block обновление семейных карточек
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      //block архивирование факта прошлого периода
      var listFact0 = getList(boardIdFact0, 'Семья').id
      closedList(listFact0)
      //block перенос факта в прошлый период
      var period0 = getPeriod(boardIdFact0, postObject.listName).period
      var listFact = getList(boardIdFact, Семья).id
      moveList(listFact, boardIdFact0)
      var listNameFact = 'Семья ' + formatterDate(period0)
      updateList(listFact, listNameFact)
    }
  } else if (postObject.account == 'Аванс') {
    //block создание новых карточек в текущем факте
    updateBudgetPeriod(postObject)
    //block архивирование текущего бюджета
    var listBudget = getList(boardIdBudget, postObject.listName).id
    closedList(listBudget)
    //block перенос бюджета +1 на текущий бюджет
    var period2 = getPeriod(boardIdBudget2, postObject.listName).period
    var listBudget2 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget2, boardIdBudget)
    var listNameBudget = postObject.listName + '' + formatterDate(period2)
    updateList(listBudget2, listNameBudget)
    //block перенос бюджета +2 на текущий бюджет+1
    var listBudget3 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget3, boardIdBudget2)
    var listNameBudget2 = postObject.listName + '' + formatterDate(getPeriod(boardIdBudget2, postObject.listName).period)
    updateList(listBudget3, listNameBudget2)
    //block добавление новый карточек на доску бюджет+2
    var newListFact = addList(postObject.listName, boardIdBudget3)
    accountItems.forEach(function (accounts) {
      if (accounts.ilya == 1 && postObject.listName == 'Илья') {
        addCard(accounts.nomenclature, newListFact.id)
      } else if (accounts.oksana == 1 && postObject.listName == 'Оксана') {
        addCard(accounts.nomenclature, newListFact.id)
      }
    })
    //block обновление карточек семьи
    if (['Илья'].indexOf(postObject.listName) !== -1) {
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
      var listNameBudget2 = 'Семья' + formatterDate(getPeriod(boardIdBudget, postObject.listName).period)
      updateList(listBudget3, listNameBudget2)
      //block добавление новый карточек на лист в бюджет+2
      var newListFact = addList(postObject.listName, boardIdBudget3)
      accountItems.forEach(function (accounts) {
        if (accounts.family == 1 && postObject.listName == 'Семья') {
          addCard(accounts.nomenclature, newListFact.id)
        }
      })
    }
  }
}