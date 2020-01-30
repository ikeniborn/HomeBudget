function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  const cardId = postData.action.data.card.id
  const listId = postData.action.data.list.id
  const idMemberCreator = postData.action.idMemberCreator
  const memberCreator = postData.action.memberCreator.username
  const actionType = postData.action.type
  const boardName = postData.action.data.board.name
  const postObject = {}
  postObject.actionId = postData.action.id
  postObject.actionDate = new Date(postData.action.date)
  postObject.listName = postData.action.data.list.name
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
  postObject.nomenclature = postData.action.data.card.name
  postObject.sum = parseComment(postData).sum
  postObject.comment = parseComment(postData).comment
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postObject)
  if (actionType == 'commentCard' && idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    if (boardName == targetSheetNameFact) {
      if (postObject.actionDate > maxDateFactTrelloBuffer) {
        updateTrelloFact(postObject, sourceSheetID, sourceSheetNameFactTrello)
        updateFactPeriod(postObject)
        var textComment = getRestSum(postObject).text
        addComment(apiRoot, apiToken, apiKey, cardId, textComment)
      }
    } else if (boardName == targetSheetNameBudget) {
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