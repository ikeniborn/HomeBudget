/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function createCardsForList(postObject) {
  try {
    var accountArray = getAccountingItem(postObject).array
    var accountItems
    if (postObject.isFact) {
      accountItems = accountArray.filter(function (row) {
        return row.fact == 1
      })
    } else if (postObject.isBudget) {
      accountItems = accountArray.filter(function (row) {
        return row.budget == 1
      })
    } else if (postObject.isTarget) {
      accountItems = accountArray.filter(function (row) {
        return row.target == 1
      })
    }
    //* Информация по меткам
    var labelList = getBoardLabel(postObject, postObject.boardId)
    //* создание карточек на листе факт
    accountItems.forEach(function (accounts) {
      var label = labelList.reduce(function (row, arrya) {
        if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
          row = {}
          row.id = arrya.id
        }
        return row
      })
      addCard(postObject, accounts.nomenclature, postObject.listId, accounts.id, label.id)
    })
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}