/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  var accountItems = getAccountingItem().filter(function (row) {
    return row.board == 1
  })
  //* архивирование факта прошлого периода
  var listFactId0 = getList(boardIdFact0, postObject.cfo).id
  closedList(listFactId0)
  //* перенос факта в прошлый период
  var period0 = getPeriod(boardIdFact0, postObject.cfo).period
  var listFactId = getList(boardIdFact, postObject.cfo).id
  moveList(listFactId, boardIdFact0)
  var listNameFact0 = postObject.cfo + ' ' + formatterDate(period0)
  updateList(listFactId, listNameFact0)
  //* создание новой фактического
  var period = getPeriod(boardIdFact, postObject.cfo)
  var newListNameFact = postObject.cfo + ' ' + formatterDate(period.period)
  var newListFact = addList(newListNameFact, boardIdFact)
  //* создание карточек  на листе и чеклистов в карточках
  var cardInfo = {}
  var budget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
  accountItems.forEach(function (accounts) {
    cardInfo = addCard(encodeData(accounts.nomenclature, '+'), newListFact.id)
    //? ограниничить создание чеклистов без бюджета
    // var checkListId = addCheckList(cardInfo.id, 'Бюджет').id
    // var budgetRow = budget.reduce(function (row, arrya) {
    //   if (arrya.cfo == postObject.cfo && cardInfo.name == arrya.nomenclature) {
    //     arrya.checkListId = checkListId
    //     row.push(arrya)
    //   }
    //   return row
    // }, [])
    // budgetRow.forEach(function (row) {
    //   addCheckListItem(row.checkListId, row.sum + ' ' + row.comment)
    // })
  })
}