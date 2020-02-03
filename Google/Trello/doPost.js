function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  const idMemberCreator = postData.action.idMemberCreator
  const memberCreator = postData.action.memberCreator.username
  const actionType = postData.action.type
  const boardId = postData.action.data.board.id
  const cardId = postData.action.data.card.id
  var sourceSheetName
  var maxDate
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postData)
  if (actionType == 'commentCard' && idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    // добавление информации в учет
    const postObject = {}
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardName = postData.action.data.board.name
    postObject.boardId = boardId
    postObject.cardName = postData.action.data.card.name
    postObject.cardId = cardId
    postObject.listId = postData.action.data.list.id
    postObject.listName = postData.action.data.list.name
    postObject.bill = getAccountingItem(sourceSheetID, accountingItemSheetName, postData.action.data.card.name).bill
    postObject.account = getAccountingItem(sourceSheetID, accountingItemSheetName, postData.action.data.card.name).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.sum = parseComment(postData).sum
    postObject.comment = parseComment(postData).comment
    if (postObject.account == 'Зарплата') {
      updateFactPeriod(postObject)
    } else if (postObject.account == 'Аванс') {
      updateBudgetPeriod(postObject)
    }
    postObject.period = getPeriod(boardId, postData.action.data.list.name).period
    postObject.ymd = getPeriod(boardId, postData.action.data.list.name).ymd
    console.log(postObject)
    if ([boardIdFact, boardIdFact0].indexOf(boardId) !== -1) {
      sourceSheetName = sourceSheetNameFactTrello
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetName), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, boardId)
        updateTrelloAccounting(postObject, boardId)
        var textComment = getRestSum(postObject).text
        // TODO проверить расчет сумм
        // addComment(apiRoot, apiToken, apiKey, cardId, textComment)
      }
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(boardId) !== -1) {
      sourceSheetName = sourceSheetNameBudgetTrello
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetName), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, boardId)
        updateTrelloAccounting(postObject, boardId)
      }
    }
    // добавление реакции на комментарий
    if (memberCreator == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, jackdawReaction)
    }
  } else if (actionType == 'deleteComment') {
    // удаление строки при удалении комментария
    const actionDataActionId = postData.action.data.action.id
    if ([boardIdFact, boardIdFact0].indexOf(boardId) !== -1) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameFactTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameFact, actionDataActionId)
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(boardId) !== -1) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameBudgetTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameBudget, actionDataActionId)
    }
  }
}