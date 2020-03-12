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
    var listNameFact0 = postObject.cfo + ' ' + formatterDate(factPeriod0).date
    updateList(postObject, listFact0.id, listNameFact0)
    //* Перенос карточек на доску факт-1
    var listFactId = postObject.listId
    var labelList = getBoardLabel(postObject, postObject.boardIdFact)
    moveAllCards(postObject, listFactId, postObject.boardIdFact0, listFact0.id)
    //* обновление текущего листа факта
    var factPeriod = getPeriod(postObject).factPeriod
    var listNameFact = postObject.cfo + ' ' + formatterDate(factPeriod).date
    updateList(postObject, listFactId, listNameFact)
    //* создание карточек на листе факт
    accountItems.forEach(function (accounts) {
      var label = labelList.reduce(function (row, arrya) {
        if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
          row = {}
          row.id = arrya.id
        }
        return row
      })
      var cardInfo = addCard(postObject, accounts.nomenclature, postObject.listId, accounts.id, label.id)
      var postObjectCard = JSON.parse(JSON.stringify(postObject))
      postObjectCard.cardId = cardInfo.id
      postObjectCard.nomenclature = accounts.nomenclature
      postObjectCard.bill = accounts.bill
      postObjectCard.account = accounts.account
      var description = getDescription(postObjectCard)
      if (description.haveBudget && accounts.useDesc == 1) {
        postObjectCard.cardDescription = description.text
        //* обновление описание карточки
        updatecardDescription(postObjectCard)
      }
    })
  } catch (e) {
    console.error('closedFactPeriod: ' + e)
  } finally {
    console.log('closedFactPeriod:complete')
  }
}