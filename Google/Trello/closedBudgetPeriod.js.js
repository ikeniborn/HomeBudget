/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(globalVar, postObject) {
  try {
    var accountItems = getAccountingItem(globalVar.accountingItemArray).filter(function (row) {
      return row.budget == 1
    })
    //* обновление текущего бюджета
    var listBudgetId = getList(globalVar, globalVar.boardIdBudget, postObject.cfo).id
    archiveAllCards(globalVar, listBudgetId)
    var budgetPeriod = getPeriod(globalVar, globalVar.boardIdBudget, postObject.cfo).period
    var listNameBudget = postObject.cfo + ' ' + formatterDate(budgetPeriod).date
    updateList(globalVar, listBudgetId, listNameBudget)
    var listBudgetId2 = getList(globalVar, globalVar.boardIdBudget2, postObject.cfo).id
    var labelListBudget = getBoardLabel(globalVar, globalVar.boardIdBudget)
    if (getCards(globalVar, listBudgetId2).length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget.reduce(function (row, arrya) {
          if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
            row = arrya
          }
          return row
        })
        addCard(globalVar, encodeData(accounts.nomenclature, '+'), listBudgetId, label.id)
      })
    } else {
      moveAllCards(globalVar, listBudgetId2, globalVar.boardIdBudget, listBudgetId)
    }
    //* обновление бюджета+1
    var budgetPeriod2 = getPeriod(globalVar, globalVar.boardIdBudget2, postObject.cfo).period
    var listNameBudget2 = postObject.cfo + ' ' + formatterDate(budgetPeriod2).date
    updateList(globalVar, listBudgetId2, listNameBudget2)
    var listBudgetId3 = getList(globalVar, globalVar.boardIdBudget3, postObject.cfo).id
    var labelListBudget2 = getBoardLabel(globalVar, globalVar.boardIdBudget2)
    if (getCards(globalVar, listBudgetId3).length == 0) {
      accountItems.forEach(function (accounts) {
        var label = labelListBudget2.reduce(function (row, arrya) {
          if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
            row = arrya
          }
          return row
        })
        addCard(globalVar, encodeData(accounts.nomenclature, '+'), listBudgetId2, label.id)
      })
    } else {
      moveAllCards(globalVar, listBudgetId3, globalVar.boardIdBudget2, listBudgetId2)
    }
    //* обновление бюджета+2
    var budgetPeriod3 = getPeriod(globalVar, globalVar.boardIdBudget3, postObject.cfo).period
    var listNameBudget3 = postObject.cfo + ' ' + formatterDate(budgetPeriod3).date
    updateList(globalVar, listBudgetId3, listNameBudget3)
    var labelListBudget3 = getBoardLabel(globalVar, globalVar.boardIdBudget3)
    accountItems.forEach(function (accounts) {
      var label = labelListBudget3.reduce(function (row, arrya) {
        if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
          row = arrya
        }
        return row
      })
      addCard(globalVar, encodeData(accounts.nomenclature, '+'), listBudgetId3, label.id)
    })
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  } finally {
    console.log('closedBudgetPeriod: complete')
  }
}