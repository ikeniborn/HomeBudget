function doPost(e) {
  var enableStackdriverLogging = true
  try {
    if (enableStackdriverLogging) console.time('loadTrello')
    if (enableStackdriverLogging) console.log('Loading from Trello STARTED')
    const postData = JSON.parse(e.postData.contents)
    const variable = {}
    const globalVar = getVariable()
    var postObject = {}
    variable.idMemberCreator = postData.action.idMemberCreator !== undefined ? postData.action.idMemberCreator : null
    variable.actionType = postData.action.type !== undefined ? postData.action.type : null
    variable.username = postData.action.memberCreator.username !== undefined ? postData.action.memberCreator.username : null
    if (enableStackdriverLogging) console.log(variable)
    if (variable.actionType == 'commentCard' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
      var AccountingItemArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.accountingItemSheetName).getDataRange().getValues()
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
      postObject.bill = getAccountingItem(AccountingItemArray, postObject.cardName).bill
      postObject.account = getAccountingItem(AccountingItemArray, postObject.cardName).account
      postObject.nomenclature = postData.action.data.card.name
      postObject.text = postData.action.data.text
      postObject.sum = parseComment(postObject.text).sum
      postObject.comment = parseComment(postObject.text).comment
      postObject.mvz = parseComment(postObject.text, postObject.cfo).mvz
      postObject.memberCreator = postData.action.memberCreator.username
      postObject.period = getPeriod(postObject.boardId, postObject.cfo).period
      postObject.ymd = getPeriod(postObject.boardId, postObject.cfo).ymd

      //* закрытие периода
      if (postObject.account == 'Остатки' && globalVar.boardIdFact == postObject.boardId) {
        updateFactPeriod(postObject)
        closedFactPeriod(postObject, AccountingItemArray)
      } else if (postObject.account == 'Аванс' && globalVar.boardIdFact === postObject.boardId) {
        // closedBudgetPeriod(postObject)
      }

      if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        maxDate = getLastDateArray(getCurrData(getAllData(globalVar.sourceSheetID, globalVar.sourceSheetNameFactTrello), postObject.ymd))
        if (postObject.actionDate > maxDate) {
          updateTrelloBuffer(postObject, postObject.boardId)
          updateTrelloAccounting(postObject, postObject.boardId)
          var textComment = getRestSum(postObject).text
          updateCard(postObject.cardId, textComment) //! проверить. Возможная пробема в обновлении карточки. 
        }
      } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
        maxDate = getLastDateArray(getCurrData(getAllData(globalVar.sourceSheetID, globalVar.sourceSheetNameBudgetTrello), postObject.ymd))
        if (postObject.actionDate > maxDate) {
          updateTrelloBuffer(postObject, postObject.boardId)
          updateTrelloAccounting(postObject, postObject.boardId)
          var textComment = getBudgetSum(postObject).text
          updateCard(postObject.cardId, textComment)
        }
      }
      // добавление реакции на комментарий
      if (postObject.memberCreator == 'oksanatischenko') {
        addReaction(postObject.actionId, globalVar.buuReaction)
      } else {
        addReaction(postObject.actionId, globalVar.jackdawReaction)
      }
    } else if (variable.actionType == 'updateComment' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
      //* обновление данных при изменении комментария
      postObject.actionId = postData.action.data.action.id
      postObject.actionDate = new Date(postData.action.date)
      postObject.boardId = postData.action.data.board.id
      postObject.cardId = postData.action.data.card.id
      postObject.text = postData.action.data.action.text
      postObject.sum = parseComment(postObject.text).sum
      postObject.comment = parseComment(postObject.text).comment
      var postObjectUpdate = {}
      var textComment
      if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        updateRowByActionId(globalVar.sourceSheetID, globalVar.sourceSheetNameFactTrello, postObject)
        postObjectUpdate = updateRowByActionId(globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
        if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1) {
          textComment = getRestSum(postObjectUpdate).text
          updateCard(postObject.cardId, textComment)
        }
      } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
        updateRowByActionId(globalVar.sourceSheetID, globalVar.sourceSheetNameBudgetTrello, postObject)
        postObjectUpdate = updateRowByActionId(globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
        textComment = getBudgetSum(postObjectUpdate).text
        updateCard(postObject.cardId, textComment)
      }
    } else if (variable.actionType == 'deleteComment') {
      // удаление строки при удалении комментария
      postObject.actionId = postData.action.data.action.id
      postObject.boardId = postData.action.data.board.id
      postObject.cardId = postData.action.data.card.id
      var postObjectDelete = {}
      if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        deleteRowByActionId(globalVar.sourceSheetID, globalVar.sourceSheetNameFactTrello, postObject)
        postObjectDelete = deleteRowByActionId(globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
        if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1) {
          var textComment = getRestSum(postObjectDelete).text
          updateCard(postObject.cardId, textComment)
        }
      } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
        deleteRowByActionId(globalVar.sourceSheetID, globalVar.sourceSheetNameBudgetTrello, postObject)
        postObjectDelete = deleteRowByActionId(globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
        var textComment = getBudgetSum(postObjectDelete).text
        updateCard(postObject.cardId, textComment)
      }
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error('ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log('Loading from Trello ENDED')
    if (enableStackdriverLogging) console.timeEnd('LoadTrello')
  }
}