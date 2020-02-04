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
    //TODO создание новых листов, карточек в текущий факт и обогащение данными из бюджета
    var period = getPeriod(boardIdBudget, postObject.listName)
    var currBudget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
    var newListNameFact = postObject.listName + '' + formatterDate(period.period)
    var newListFact = addList(newListNameFact, boardIdFact)
    // accountItems.forEach(function (accounts) {
    //   if (accounts.ilya == 1 && postObject.listName == 'Илья') {
    //     addCard(accounts.nomenclature, newListBudget3.id)
    //   } else if (accounts.oksana == 1 && postObject.listName == 'Оксана') {
    //     addCard(accounts.nomenclature, newListBudget3.id)
    //   }
    // })
    //block обновление семейных карточек
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      //block архивирование факта прошлого периода
      var listFact0 = getList(boardIdFact0, 'Семья').id
      closedList(listFact0)
      //block перенос факта в прошлый период
      var period0 = getPeriod(boardIdFact0, postObject.listName).period
      var listFact = getList(boardIdFact, Семья).id
      moveList(listFact, boardIdFact0)
      var listNameFact = 'Семья ' + formatterDate(period0.period)
      updateList(listFact, listNameFact)
    }
  } else if (postObject.account == 'Аванс') {
    var accountItems = getAccountingItem()
    //block создание новых карточек в бюджете
    updateBudgetPeriod(postObject)
    //block архивирование текущего бюджета
    var listBudget = getList(boardIdBudget, postObject.listName).id
    closedList(listBudget)
    //block перенос бюджета +1 на текущий бюджет
    var period = getPeriod(boardIdBudget2, postObject.listName).period
    var listBudget2 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget2, boardIdBudget)
    var listNameBudget = postObject.listName + '' + formatterDate(period.period)
    updateList(listBudget2, listNameBudget)
    //block перенос бюджета +2 на текущий бюджет+1
    var period2 = getPeriod(boardIdBudget2, postObject.listName).period
    var listBudget3 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget3, boardIdBudget2)
    var listNameBudget2 = postObject.listName + '' + formatterDate(period2.period)
    updateList(listBudget3, listNameBudget2)
    //block добавление новый карточек на доску бюджет+2
    var period3 = getPeriod(boardIdBudget3, postObject.listName).period
    var listNameBudget3 = postObject.listName + '' + formatterDate(period3.period)
    var newListBudget3 = addList(listNameBudget3, boardIdBudget3)
    accountItems.forEach(function (accounts) {
      if (accounts.ilya == 1 && postObject.listName == 'Илья') {
        addCard(accounts.nomenclature, newListBudget3.id)
      } else if (accounts.oksana == 1 && postObject.listName == 'Оксана') {
        addCard(accounts.nomenclature, newListBudget3.id)
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
      var listNameBudget2 = 'Семья' + formatterDate(getPeriod(boardIdBudget, 'Семья').period)
      updateList(listBudget3, listNameBudget2)
      //block добавление новый карточек на лист в бюджет+2
      var period3 = getPeriod(boardIdBudget3, 'Семья').period
      var listNameBudget3 = 'Семья ' + formatterDate(period3)
      var newListBudget3 = addList(listNameBudget3, boardIdBudget3)
      accountItems.forEach(function (accounts) {
        if (accounts.family == 1 && postObject.listName == 'Семья') {
          addCard(accounts.nomenclature, newListBudget3.id)
        }
      })
    }
  }
}