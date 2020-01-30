function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  const postObject = {}
  const cardId = postData.action.data.card.id
  const listId = postData.action.data.list.id
  const idMemberCreator = postData.action.idMemberCreator
  const memberCreator = postData.action.memberCreator.username
  postObject.actionId = postData.action.id
  postObject.actionDate = new Date(postData.action.date)
  postObject.actionType = postData.action.type
  postObject.listName = postData.action.data.list.name
  postObject.boardName = postData.action.data.board.name
  postObject.cardName = postData.action.data.card.name
  postObject.sum = parseComment(postData).sum
  postObject.comment = parseComment(postData).comment
  postObject.bill = accountingItem.reduce(function (bill, array) {
    if (array.nomenclature == postData.action.data.card.name) {
      bill = array.bill
    }
    return bill
  })
  postObject.account = accountingItem.reduce(function (account, array) {
    if (array.nomenclature == postData.action.data.card.name) {
      account = array.account
    }
    return account
  })
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postObject)
  if (postObject.actionType == 'commentCard' && idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    if (postObject.boardName == targetSheetNameFact) {
      if (postObject.actionDate > maxDateFactTrelloBuffer) {
        updateTrelloFact(postObject, sourceSheetID, sourceSheetNameFactTrello)
        updateFactPeriod(postObject)
        var textComment = getRestSum(postDataEvent).text
        addComment(apiRoot, apiToken, apiKey, cardId, textComment)
      }
    } else if (postObject.boardName == targetSheetNameBudget) {
      if (postObject.actionDate > maxDateBudgetTrelloBuffer.getTime) {
        updateTrelloBudget(postData, sourceSheetID, sourceSheetNameBudgetTrello)
        copyData(sourceSheetID, targetSheetID, sourceSheetNameBudgetTrello, targetSheetNameBudget)
      }
    }
    if (memberCreator == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, jackdawReaction)
    }
  } else if (postData.action.type == 'deleteComment') {
    const actionDataActionId = postData.action.data.action.id
    if (postObject.boardName = targetSheetNameFact) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameFactTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameFact, actionDataActionId)
    } else if (postObject.boardName = targetSheetNameBudget) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameBudgetTrello, actionDataActionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameBudget, actionDataActionId)
    }
  }
}