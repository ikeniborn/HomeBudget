/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  updateFactPeriod(postObject)
  var accountItems = getAccountingItem().filter(function (row) {
    if (postObject.cfo == 'Илья') {
      return row.ilya == 1
    } else if (postObject.cfo == 'Оксана') {
      return row.oksana == 1
    }
  })
  //block архивирование факта прошлого периода
  var listFactId0 = getList(boardIdFact0, postObject.cfo).id
  closedList(listFactId0)
  //block перенос факта в прошлый период
  var period0 = getPeriod(boardIdFact0, postObject.cfo).period
  var listFactId = getList(boardIdFact, postObject.cfo).id
  moveList(listFactId, boardIdFact0)
  var listNameFact = postObject.cfo + '' + formatterDate(period0)
  updateList(listFactId, listNameFact)
  var period = getPeriod(boardIdBudget, postObject.cfo)
  var newListNameFact = postObject.cfo + '' + formatterDate(period.period)
  var newListFact = addList(newListNameFact, boardIdFact)
  //block создание карточек  на листе и чеклистов в карточках
  var cardInfo = {}
  var budget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
  accountItems.forEach(function (accounts) {
    cardInfo = addCard(encodeData(accounts.nomenclature, '+'), newListFact.id)
    // создние чеклиста для листа оксаны
    checkListId = addCheckList(cardInfo.id, 'Бюджет').id
    var budgetRow = budget.reduce(function (row, arrya) {
      if (arrya.cfo == postObject.cfo && cardInfo.name == arrya.nomenclature) {
        arrya.checkListId = checkListId
        row.push(arrya)
      }
      return row
    }, [])
    budgetRow.forEach(function (row) {
      addCheckListItem(row.checkListId, row.sum + ' ' + row.comment)
    })
  })
  //block обновление семейных карточек
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    var accountItems = getAccountingItem().filter(function (row) {
      return row.family == 1
    })
    //block архивирование факта прошлого периода
    var listFact0 = getList(boardIdFact0, 'Семья').id
    closedList(listFact0)
    //block перенос факта в прошлый период
    var period0 = getPeriod(boardIdFact0, postObject.cfo).period
    var listFact = getList(boardIdFact, Семья).id
    moveList(listFact, boardIdFact0)
    var listNameFact = 'Семья ' + formatterDate(period0.period)
    updateList(listFact, listNameFact)
    var period = getPeriod(boardIdBudget, 'Семья')
    var newListNameFact = 'Семья ' + formatterDate(period.period)
    var newListFact = addList(newListNameFact, boardIdFact)
    //block создание карточек  на листе и чеклистов в карточках
    var cardInfo = {}
    var budget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
    accountItems.forEach(function (accounts) {
      cardInfo = addCard(encodeData(accounts.nomenclature, '+'), newListFact.id)
      // создние чеклиста для листа оксаны
      checkListId = addCheckList(cardInfo.id, 'Бюджет').id
      var budgetRow = budget.reduce(function (row, arrya) {
        if (arrya.cfo == 'Семья' && cardInfo.name == arrya.nomenclature) {
          arrya.checkListId = checkListId
          row.push(arrya)
        }
        return row
      }, [])
      budgetRow.forEach(function (row) {
        addCheckListItem(row.checkListId, row.sum + ' ' + row.comment)
      })
    })
  }
}