/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  try {
    const postObjectBudget = JSON.parse(JSON.stringify(postObject))
    postObjectBudget.boardId = postObjectBudget.boardIdBudget
    postObjectBudget.listId = getList(postObjectBudget).id
    postObjectBudget.isFact = false
    postObjectBudget.isBudget = true
    postObjectBudget.date = getPeriod(postObjectBudget)
    postObjectBudget.budgetPeriod = postObjectBudget.date.budgetPeriod
    postObjectBudget.budgetPeriod2 = postObjectBudget.date.budgetPeriod2
    postObjectBudget.budgetPeriod3 = postObjectBudget.date.budgetPeriod3
    postObjectBudget.listName = postObjectBudget.cfo + ' ' + formatterDate(postObjectBudget.budgetPeriod).date
    const postObjectBudget2 = JSON.parse(JSON.stringify(postObjectBudget))
    postObjectBudget2.boardId = postObjectBudget.boardIdBudget2
    postObjectBudget2.listId = getList(postObjectBudget2).id
    postObjectBudget2.listName = postObjectBudget2.cfo + ' ' + formatterDate(postObjectBudget2.budgetPeriod2).date
    const postObjectBudget3 = JSON.parse(JSON.stringify(postObjectBudget2))
    postObjectBudget3.boardId = postObjectBudget.boardIdBudget3
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
    } else {
      moveAllCards(postObjectBudget3, postObjectBudget2)
    }
    createCardsForList(postObjectBudget3)
    updateList(postObjectBudget)
    updateList(postObjectBudget2)
    updateList(postObjectBudget2)
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  }
}