/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  try {
    var accountArray = postObject.accountingItem.array
    var accountItems = accountArray.filter(function (row) {
      return row.fact == 1
    })
    //* закрытие листа на доске факт-1
    var listFact0 = getList(postObject, postObject.boardIdFact0)
    archiveAllCards(postObject, listFact0.id)
    var factPeriod0 = getPeriod(postObject).factPeriod0
    var listNameFact0 = postObject.listName + ' ' + formatterDate(factPeriod0).date
    updateList(postObject, listFact0.id, listNameFact0)
    //* Перенос карточек на доску факт-1
    var listFactId = postObject.listId
    var labelList = getBoardLabel(postObject, globalVar.boardIdFact)
    moveAllCards(postObject, listFactId, globalVar.boardIdFact0, listFact0.id)
    //* обновление текущего листа факта
    var factPeriod = getPeriod(postObject).factPeriod
    var listNameFact = postObject.listName + ' ' + formatterDate(factPeriod).date
    updateList(postObject, listFactId, listNameFact)
    //* создание карточек на листе факт и чеклистов в карточках
    var budget = getCurrData(getAllData(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget), period.ymd)
    accountItems.forEach(function (accounts) {
      var label = labelList.reduce(function (row, arrya) {
        if (arrya.name.toUpperCase() == accounts.bill.toUpperCase()) {
          row = arrya
        }
        return row
      })
      accounts.cardInfo = addCard(postObject, encodeData(accounts.nomenclature, '+'), listFactId, accounts.id, label.id)
      // var card = accounts.cardInfo
      // card.withBudget = budget.reduce(function (row, arrya) {
      //   if (arrya.cfo == postObject.listName && card.name == arrya.nomenclature) {
      //     row += 1
      //   }
      //   return row
      // }, 0)
      // if (card.withBudget > 0) {
      //   card.checkListId = addCheckList(postObject, card.id, 'Бюджет').id
      // }
      // var budgetRow = budget.filter(function (arrya) {
      //   arrya.checkListId = card.checkListId
      //   return arrya.cfo == postObject.listName && card.name == arrya.nomenclature && card.withBudget > 0
      // })
      // budgetRow.forEach(function (row) {
      //   addCheckListItem(postObject, row.checkListId, row.sum + ' ' + row.comment)
      // })
    })
  } catch (e) {
    console.error('closedFactPeriod: ' + e)
  }
}