function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  const idMemberCreator = postData.action.idMemberCreator
  const memberCreator = postData.action.memberCreator.username
  const actionType = postData.action.type
  const boardId = postData.action.data.board.id
  const cardId = postData.action.data.card.id
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postData)
  if (actionType == 'commentCard' && idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    const postObject = {}
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.period = getPeriod(boardId, postData.action.data.list.name).period
    postObject.ymd = getPeriod(boardId, postData.action.data.list.name).ymd
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
    console.log(postObject)
    if (boardId == boardIdFact) {
      if (postObject.actionDate > maxDateFactTrelloBuffer) {
        updateTrelloBuffer(postObject, sourceSheetID, sourceSheetNameFactTrello)
        updateFactPeriod(postObject)
        updateTrelloAccounting(postObject, targetSheetID, targetSheetNameFact)
        var textComment = getRestSum(postObject).text
        addComment(apiRoot, apiToken, apiKey, cardId, textComment)
      }
    } else if (boardId == boardIdBudget) {
      if (postObject.actionDate > maxDateBudgetTrelloBuffer) {
        updateTrelloBuffer(postData, sourceSheetID, sourceSheetNameBudgetTrello)
        updateTrelloAccounting(postObject, targetSheetID, targetSheetNameBudget)
      }
    }
    if (memberCreator == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, jackdawReaction)
    }
  } else if (actionType == 'deleteComment') {
    const actionDataActionId = postData.action.data.action.id
    if (boardName = targetSheetNameFact) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameFactTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameFact, actionDataActionId)
    } else if (boardName = targetSheetNameBudget) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameBudgetTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameBudget, actionDataActionId)
    }
  }
}