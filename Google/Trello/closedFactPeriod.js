/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  try {
    updateParametr(postObject, postObject.budgetPeriod)
    const postObjectTarget = copyObject(postObject)
    postObjectTarget.type = 'Цель'
    updateParametr(postObjectTarget, postObject.budgetPeriod)
    const postObjectFact0 = copyObject(postObject)
    postObjectFact0.boardId = postObjectFact0.boardIdFact0
    postObjectFact0.listId = getList(postObjectFact0).id
    postObjectFact0.listName = postObjectFact0.cfo + ' ' + formatterDate(postObjectBudget.factPeriod0).date
    //* закрытие листа на доске факт-1
    archiveAllCards(postObjectFact0)
    updateList(postObjectFact0)
    //* Перенос карточек на доску факт-1
    moveAllCards(postObject, postObjectFact0)
    //* обновление текущего листа факта
    updateList(postObject)
    //* создание карточек на листе факт
    createCardsForList(postObject)
  } catch (e) {
    console.error('closedFactPeriod: ' + e)
  } finally {
    console.log('closedFactPeriod:complete')
  }
}