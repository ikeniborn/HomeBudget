/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  try {
    var accountArray = postObject.accountingItem.array
    var accountItems = accountArray.filter(function (row) {
      return row.budget == 1
    })
    //* обновление текущего бюджета
    var listBudget = getList(postObject, postObject.boardIdBudget)
    archiveAllCards(postObject, listBudget.id)
    var budgetPeriod = getPeriod(postObject).budgetPeriod
    var listNameBudget = postObject.cfo + ' ' + formatterDate(budgetPeriod).date
    updateList(postObject, listBudget.id, listNameBudget)
    var listBudget2 = getList(postObject, postObject.boardIdBudget2)
    var labelListBudget = getBoardLabel(postObject, postObject.boardIdBudget)
    var countCardsListBudget2 = getCards(postObject, listBudget2.id).array
    if (countCardsListBudget2.length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget.reduce(function (row, arrya) {
          if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
            row = {}
            row.id = arrya.id
          }
          return row
        })
        addCard(postObject, accounts.nomenclature, listBudget2.id, accounts.id, label.id)
      })
    } else {
      moveAllCards(postObject, listBudget2.id, postObject.boardIdBudget, listBudget.id)
    }
    //* обновление бюджета+1
    var budgetPeriod2 = getPeriod(postObject).budgetPeriod2
    var listNameBudget2 = postObject.cfo + ' ' + formatterDate(budgetPeriod2).date
    updateList(postObject, listBudget2.id, listNameBudget2)
    var listBudget3 = getList(postObject, postObject.boardIdBudget3).id
    var labelListBudget2 = getBoardLabel(postObject, postObject.boardIdBudget2)
    var countCardsListBudget3 = getCards(postObject, listBudget3.id).array
    if (countCardsListBudget3.length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget2.reduce(function (row, arrya) {
          if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
            row = {}
            row.id = arrya.id
          }
          return row
        })
        addCard(postObject, accounts.nomenclature, listBudget2.id, accounts.id, label.id)
      })
    } else {
      moveAllCards(postObject, listBudget3.id, postObject.boardIdBudget2, listBudget2.id)
    }
    //* обновление бюджета+2
    var budgetPeriod3 = getPeriod(postObject).budgetPeriod3
    var listNameBudget3 = postObject.cfo + ' ' + formatterDate(budgetPeriod3).date
    updateList(postObject, listBudget3.id, listNameBudget3)
    var labelListBudget3 = getBoardLabel(postObject, postObject.boardIdBudget3)
    accountItems.forEach(function (accounts) {
      var label = labelListBudget3.reduce(function (row, arrya) {
        if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
          row = {}
          row.id = arrya.id
        }
        return row
      })
      addCard(postObject, accounts.nomenclature, listBudget3.id, accounts.id, label.id)
    })
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  }
}