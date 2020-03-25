/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  try {
    const postObjectBudget = copyObject(postObject)
    postObjectBudget.boardId = postObjectBudget.boardIdBudget
    postObjectBudget.listId = getList(postObjectBudget).id
    postObjectBudget.listName = postObjectBudget.cfo + ' ' + formatterDate(postObjectBudget.budgetPeriod).date
    archiveAllCards(postObjectBudget)
    updateList(postObjectBudget)
    const postObjectBudget2 = copyObject(postObjectBudget)
    postObjectBudget2.boardId = postObjectBudget2.boardIdBudget2
    postObjectBudget2.listId = getList(postObjectBudget2).id
    postObjectBudget2.listName = postObjectBudget2.cfo + ' ' + formatterDate(postObjectBudget2.budgetPeriod2).date
    moveAllCards(postObjectBudget2, postObjectBudget)
    updateList(postObjectBudget2)
    const postObjectBudget3 = copyObject(postObjectBudget2)
    postObjectBudget3.boardId = postObjectBudget3.boardIdBudget3
    postObjectBudget3.listId = getList(postObjectBudget3).id
    postObjectBudget3.listName = postObjectBudget3.cfo + ' ' + formatterDate(postObjectBudget3.budgetPeriod3).date
    moveAllCards(postObjectBudget3, postObjectBudget2)
    createCardsForList(postObjectBudget3)
    updateList(postObjectBudget3)
  } catch (e) {
    console.error('closedBudgetPeriod: ' + e)
  }
}