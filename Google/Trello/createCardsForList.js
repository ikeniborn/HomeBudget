/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function createCardsForList(postObject) {
  try {
    var accountArray = postObject.accountingItem.array
    var accountItems
    if (postObject.isFact) {
      accountItems = accountArray.filter(function (row) {
        return row.fact == 1
      })
    } else if (postObject.isBudget) {
      accountItems = accountArray.filter(function (row) {
        return row.budget == 1
      })
    } else if (postObject.isBudget) {
      accountItems = accountArray.filter(function (row) {
        return row.target == 1
      })
    }
    //* Перенос карточек на доску факт-1
    var labelList = getBoardLabel(postObject, postObject.boardIdFact)
    //* обновление текущего листа факта
    var listName = postObject.cfo + ' ' + formatterDate(postObject.period).date
    updateList(postObject, postObject.listId, listName)
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
      if (description.haveBudget) {
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