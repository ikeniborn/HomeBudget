/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  updateFactPeriod(postObject)
  //block архивирование факта прошлого периода
  var listFact0 = getList(boardIdFact0, postObject.cfo).id
  closedList(listFact0)
  //block перенос факта в прошлый период
  var period0 = getPeriod(boardIdFact0, postObject.cfo).period
  var listFact = getList(boardIdFact, postObject.cfo)
  moveList(listFact.id, boardIdFact0)
  var listNameFact = postObject.cfo + '' + formatterDate(period0)
  updateList(listFact, listNameFact)
  //TODO создание новых листов, карточек в текущий факт и обогащение данными из бюджета
  var period = getPeriod(boardIdBudget, postObject.cfo)
  var currBudget = getCurrData(getAllData(targetSheetID, targetSheetNameBudget), period.ymd)
  var newListNameFact = postObject.cfo + '' + formatterDate(period.period)
  var newListFact = addList(newListNameFact, boardIdFact)
  // accountItems.forEach(function (accounts) {
  //   if (accounts.ilya == 1 && postObject.cfo == 'Илья') {
  //     addCard(accounts.nomenclature, newListBudget3.id)
  //   } else if (accounts.oksana == 1 && postObject.cfo == 'Оксана') {
  //     addCard(accounts.nomenclature, newListBudget3.id)
  //   }
  // })
  //block обновление семейных карточек
  if (['Илья'].indexOf(postObject.cfo) !== -1) {
    //block архивирование факта прошлого периода
    var listFact0 = getList(boardIdFact0, 'Семья').id
    closedList(listFact0)
    //block перенос факта в прошлый период
    var period0 = getPeriod(boardIdFact0, postObject.cfo).period
    var listFact = getList(boardIdFact, Семья).id
    moveList(listFact, boardIdFact0)
    var listNameFact = 'Семья ' + formatterDate(period0.period)
    updateList(listFact, listNameFact)
  }
}