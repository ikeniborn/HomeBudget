/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  try {

    const postObjectBudget = copyObject(postObject)
    postObjectBudget.type = 'Бюджет'
    updateParametr(postObject, postObject.budgetPeriod)
    postObjectBudget.boardId = postObjectBudget.boardIdBudget
    postObjectBudget.listId = getList(postObjectBudget).id
    postObjectBudget.listName = postObjectBudget.cfo + ' ' + formatterDate(postObjectBudget.budgetPeriod).date
    const postObjectBudget2 = copyObject(postObjectBudget)
    postObjectBudget2.boardId = postObjectBudget2.boardIdBudget2
    postObjectBudget2.listId = getList(postObjectBudget2).id
    postObjectBudget2.listName = postObjectBudget2.cfo + ' ' + formatterDate(postObjectBudget2.budgetPeriod2).date
    const postObjectBudget3 = copyObject(postObjectBudget2)
    postObjectBudget3.boardId = postObjectBudget3.boardIdBudget3
    postObjectBudget3.listId = getList(postObjectBudget3).id
    postObjectBudget3.listName = postObjectBudget3.cfo + ' ' + formatterDate(postObjectBudget3.budgetPeriod3).date
    var countCardsListBudget2 = getCards(postObjectBudget2).array
    var countCardsListBudget3 = getCards(postObjectBudget3).array
    //* обновление бюджета
    archiveAllCards(postObjectBudget)
    if (countCardsListBudget2.length == 0) {
      createCardsForList(postObjectBudget)
    } else {
      moveAllCards(postObjectBudget2, postObjectBudget)
    }
    if (countCardsListBudget3.length == 0) {
      createCardsForList(postObjectBudget2)
      createCardsForList(postObjectBudget3)
    } else {
      moveAllCards(postObjectBudget3, postObjectBudget2)
      createCardsForList(postObjectBudget3)
    }
    updateList(postObjectBudget)
    updateList(postObjectBudget2)
    updateList(postObjectBudget2)
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  }
}