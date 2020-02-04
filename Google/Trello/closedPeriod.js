function closedPeriod(postObject) {
  if (postObject.account == 'Зарплата') {
    updateFactPeriod(postObject)
    // архивирование факта прошлого периода
    var listFact0 = getList(boardIdFact0, postObject.listName).id
    closedList(listFact0)
    // перенос факта в прошлый период
    var listFact = getList(boardIdFact, postObject.listName)
    moveList(listFact.id, boardIdFact0)
    var listNameFact = postObject.listName + '' + formatterDate(getPeriod(boardIdFact0, postObject.listName).period)
    updateList(listFact, listNameFact)
    // обновление семейных карточек
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      // архивирование факта прошлого периода
      var listFact0 = getList(boardIdFact0, 'Семья').id
      closedList(listFact0)
      // перенос факта в прошлый период
      var listFact = getList(boardIdFact, Семья).id
      moveList(listFact, boardIdFact0)
      var listNameFact = 'Семья ' + formatterDate(getPeriod(boardIdFact0, postObject.listName).period)
      updateList(listFact, listNameFact)
    }
    //
  } else if (postObject.account == 'Аванс') {
    updateBudgetPeriod(postObject)
    // архивирование текущего бюджета
    var listBudget = getList(boardIdBudget, postObject.listName).id
    closedList(listBudget)
    // перенос бюджета +1 на текущий бюджет
    var listBudget2 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget2, boardIdBudget)
    var listNameBudget = postObject.listName + '' + formatterDate(getPeriod(boardIdBudget, postObject.listName).period)
    updateList(listBudget2, listNameBudget)
    // перенос бюджета +2 на текущий бюджет+1
    var listBudget3 = getList(boardIdBudget2, postObject.listName).id
    moveList(listBudget3, boardIdBudget2)
    var listNameBudget2 = postObject.listName + '' + formatterDate(getPeriod(boardIdBudget, postObject.listName).period)
    updateList(listBudget3, listNameBudget2)
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      // архивирование текущего бюджета
      var listBudget = getList(boardIdBudget, 'Семья').id
      closedList(listBudget)
      // перенос бюджета +1 на текущий бюджет
      var listBudget2 = getList(boardIdBudget2, 'Семья').id
      moveList(listBudget2, boardIdBudget)
      var listNameBudget = 'Семья ' + formatterDate(getPeriod(boardIdBudget, 'Семья').period)
      updateList(listBudget2, listNameBudget)
      // перенос бюджета +2 на текущий бюджет+1

      var listBudget3 = getList(boardIdBudget2, 'Семья').id
      moveList(listBudget3, boardIdBudget2)
      var listNameBudget2 = 'Семья' + formatterDate(getPeriod(boardIdBudget, postObject.listName).period)
      updateList(listBudget3, listNameBudget2)
    }
  }
}