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
    var maxDate
    // добавление информации в учет
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardName = postData.action.data.board.name
    postObject.boardId = postData.action.data.board.id
    postObject.cfo = parseListName(postData.action.data.list.name)
    postObject.listId = postData.action.data.list.id
    postObject.cardName = postData.action.data.card.name
    postObject.cardId = postData.action.data.card.id
    postObject.bill = getAccountingItem(postObject.cardName).bill
    postObject.account = getAccountingItem(postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.mvz = parseComment(postObject.text, postObject.cfo).mvz
    postObject.memberCreator = postData.action.memberCreator.username
    postObject.period = getPeriod(postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(postObject.boardId, postObject.cfo).ymd
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetNameFactTrello), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, postObject.boardId)
        updateTrelloAccounting(postObject, postObject.boardId)
        if ([boardIdFact].indexOf(postObject.boardId) !== -1) {
          var textComment = getRestSum(postObject).text
          updateCard(postObject.cardId, textComment)
        }
      }
      //* закрытие периода
      if ([boardIdFact].indexOf(postObject.boardId) !== -1) {
        if (['Остатки'].indexOf(postObject.account) !== -1) {
          updateFactPeriod(postObject)
          closedFactPeriod(postObject)
        } else if (['Аванс'].indexOf(postObject.account) !== -1) {
          // closedBudgetPeriod(postObject)
        }
      }
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      maxDate = getLastDateArray(getCurrData(getAllData(sourceSheetID, sourceSheetNameBudgetTrello), postObject.ymd))
      if (postObject.actionDate > maxDate) {
        updateTrelloBuffer(postObject, postObject.boardId)
        updateTrelloAccounting(postObject, postObject.boardId)
        var textComment = getBudgetSum(postObject).text
        updateCard(postObject.cardId, textComment)
      }
    }
    // добавление реакции на комментарий
    if (postObject.memberCreator == 'oksanatischenko') {
      addReaction(postObject.actionId, buuReaction)
    } else {
      addReaction(postObject.actionId, jackdawReaction)
    }
  } else if (variable.actionType == 'updateComment' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    postObject.actionId = postData.action.data.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardId = postData.action.data.board.id
    postObject.cardId = postData.action.data.card.id
    postObject.text = postData.action.data.action.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    var postObjectUpdate = {}
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      updateRowByActionId(sourceSheetID, sourceSheetNameFactTrello, postObject)
      postObjectUpdate = updateRowByActionId(targetSheetID, targetSheetNameFact, postObject)
      if ([boardIdFact].indexOf(postObject.boardId) !== -1) {
        var textComment = getRestSum(postObjectUpdate).text
        updateCard(postObject.cardId, textComment)
      }
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      updateRowByActionId(sourceSheetID, sourceSheetNameBudgetTrello, postObject)
      postObjectUpdate = updateRowByActionId(targetSheetID, targetSheetNameBudget, postObject)
      var textComment = getBudgetSum(postObjectUpdate).text
      updateCard(postObject.cardId, textComment)
    }
  } else if (variable.actionType == 'deleteComment') {
    // удаление строки при удалении комментария
    postObject.actionId = postData.action.data.action.id
    postObject.boardId = postData.action.data.board.id
    postObject.cardId = postData.action.data.card.id
    var postObjectDelete = {}
    if ([boardIdFact, boardIdFact0].indexOf(postObject.boardId) !== -1) {
      deleteRowByActionId(sourceSheetID, sourceSheetNameFactTrello, postObject)
      postObjectDelete = deleteRowByActionId(targetSheetID, targetSheetNameFact, postObject)
      if ([boardIdFact].indexOf(postObject.boardId) !== -1) {
        var textComment = getRestSum(postObjectDelete).text
        updateCard(postObject.cardId, textComment)
      }
    } else if ([boardIdBudget, boardIdBudget2, boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      deleteRowByActionId(sourceSheetID, sourceSheetNameBudgetTrello, postObject)
      postObjectDelete = deleteRowByActionId(targetSheetID, targetSheetNameBudget, postObject)
      var textComment = getBudgetSum(postObjectDelete).text
      updateCard(postObject.cardId, textComment)
    }
  }
}