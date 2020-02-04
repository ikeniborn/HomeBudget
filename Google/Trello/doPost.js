function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postData)
  const variable = {}
  var postObject = {}
  variable.idMemberCreator = postData.action.idMemberCreator !== undefined ? postData.action.idMemberCreator : null
  variable.actionType = postData.action.type !== undefined ? postData.action.type : null
  console.log(variable)
  if (variable.actionType == 'commentCard' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    var sourceSheetName
    var maxDate
    // добавление информации в учет
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardName = postData.action.data.board.name
    postObject.boardId = postData.action.data.board.id
    postObject.listName = parseListName(postData.action.data.list.name)
    postObject.listId = postData.action.data.list.id
    postObject.cardName = postData.action.data.card.name
    postObject.cardId = postData.action.data.card.id
    postObject.bill = getAccountingItem(postObject.cardName).bill
    postObject.account = getAccountingItem(postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.mvz = parseComment(postObject.text, postObject.listName).mvz
    postObject.memberCreator = postData.action.memberCreator.username
    if (['Зарплата', 'Аванс'].indexOf(postObject.account) !== -1) {
      // closedPeriod(postObject)
    }
    postObject.period = getPeriod(postObject.boardId, postData.action.data.list.name).period
    postObject.ymd = getPeriod(postObject.boardId, postData.action.data.list.name).ymd
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      sourceSheetName = sourceSheetNameFactTrello
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetName), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, postObject.boardId)
        updateTrelloAccounting(postObject, postObject.boardId)
        if ([boardIdFact].indexOf(postObject.boardId) !== -1) {
          var textComment = getRestSum(postObject).text
          addComment(apiRoot, apiToken, apiKey, postObject.cardId, textComment)
        }
      }
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      sourceSheetName = sourceSheetNameBudgetTrello
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetName), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, postObject.boardId)
        updateTrelloAccounting(postObject, postObject.boardId)
        var textComment = getBudgetSum(postObject).text
        addComment(apiRoot, apiToken, apiKey, postObject.cardId, textComment)
      }
    }
    // добавление реакции на комментарий
    if (postObject.memberCreator == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, jackdawReaction)
    }
  } else if (variable.actionType == 'updateComment' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    postObject.actionId = postData.action.data.action.id
    postObject.boardId = postData.action.data.board.id
    postObject.text = postData.action.data.action.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      updateRowByIdAction(sourceSheetID, sourceSheetNameFactTrello, postObject)
      updateRowByIdAction(targetSheetID, targetSheetNameFact, postObject)
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      updateRowByIdAction(sourceSheetID, sourceSheetNameBudgetTrello, postObject)
      updateRowByIdAction(targetSheetID, targetSheetNameBudget, postObject)
    }
    updateRowByIdAction(sheetID, sheetName, postObject)
  } else if (variable.actionType == 'deleteComment') {
    // удаление строки при удалении комментария
    postObject.actionId = postData.action.data.action.id
    postObject.boardId = postData.action.data.board.id
    console.log(postObject)
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameFactTrello, postObject.actionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameFact, postObject.actionId)
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      deleteRowByIdAction(sourceSheetID, sourceSheetNameBudgetTrello, postObject.actionId)
      deleteRowByIdAction(targetSheetID, targetSheetNameBudget, postObject.actionId)
    }
  }
}