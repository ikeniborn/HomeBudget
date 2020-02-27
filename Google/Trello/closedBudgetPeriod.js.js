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
    var listNameBudget = postObject.listName + ' ' + formatterDate(budgetPeriod).date
    updateList(postObject, listBudget.id, listNameBudget)
    var listBudget2 = getList(postObject, postObject.boardIdBudget2)
    var labelListBudget = getBoardLabel(postObject, postObject.boardIdBudget)
    if (getCards(postObject, listBudget2.id).length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget.reduce(function (row, arrya) {
          if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
            row = arrya
          }
          return row
        })
        addCard(postObject, encodeData(accounts.nomenclature, '+'), listBudget2.id, label.id)
      })
    } else {
      moveAllCards(postObject, listBudget2.id, postObject.boardIdBudget, listBudget.id)
    }
    //* обновление бюджета+1
    var budgetPeriod2 = getPeriod(postObject).budgetPeriod2
    var listNameBudget2 = postObject.listName + ' ' + formatterDate(budgetPeriod2).date
    updateList(postObject, listBudget2.id, listNameBudget2)
    var listBudget3 = getList(postObject, postObject.boardIdBudget3).id
    var labelListBudget2 = getBoardLabel(postObject, postObject.boardIdBudget2)
    if (getCards(postObject, listBudget3.id).length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget2.reduce(function (row, arrya) {
          if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
            row = arrya
          }
          return row
        })
        addCard(postObject, encodeData(accounts.nomenclature, '+'), listBudget2.id, label.id)
      })
    } else {
      moveAllCards(postObject, listBudget3.id, postObject.boardIdBudget2, listBudget2.id)
    }
    //* обновление бюджета+2
    var budgetPeriod3 = getPeriod(postObject).budgetPeriod3
    var listNameBudget3 = postObject.listName + ' ' + formatterDate(budgetPeriod3).date
    updateList(postObject, listBudget3.id, listNameBudget3)
    var labelListBudget3 = getBoardLabel(postObject, postObject.boardIdBudget3)
    accountItems.forEach(function (accounts) {
      var label = labelListBudget3.reduce(function (row, arrya) {
        if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
          row = arrya
        }
        return row
      })
      addCard(postObject, encodeData(accounts.nomenclature, '+'), listBudget3.id, label.id)
    })
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  }
}