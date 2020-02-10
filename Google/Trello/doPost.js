function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  const variable = {}
  const globalVar = getVariable()
  var postObject = {}
  var AccountingItemArray
  var textComment
  variable.idMemberCreator = postData.action.idMemberCreator !== undefined ? postData.action.idMemberCreator : null
  variable.actionType = postData.action.type !== undefined ? postData.action.type : null
  variable.username = postData.action.memberCreator.username !== undefined ? postData.action.memberCreator.username : null
  console.log(variable)
  if (variable.actionType == 'commentCard' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    AccountingItemArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.accountingItemSheetName).getDataRange().getValues()
    //* добавление информации в учет
    postObject.globalVar = globalVar
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
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      updateTrelloBuffer(globalVar, postObject, postObject.boardId)
      updateTrelloAccounting(globalVar, postObject, postObject.boardId)
      textComment = getRestSum(globalVar, postObject).text
      updateCard(globalVar, postObject.cardId, textComment)
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      updateTrelloBuffer(globalVar, postObject, postObject.boardId)
      updateTrelloAccounting(globalVar, postObject, postObject.boardId)
      textComment = getBudgetSum(globalVar, postObject).text
      updateCard(globalVar, postObject.cardId, textComment)
    }
    //* добавление реакции на комментарий
    if (variable.idMemberCreator == '55cb5c5729ae976dfd2b901e') {
      addReaction(globalVar, postObject.actionId, globalVar.buuReaction)
    } else {
      addReaction(globalVar, postObject.actionId, globalVar.jackdawReaction)
    }
  } else if (variable.actionType == 'updateComment' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    //* обновление данных при изменении комментария
    AccountingItemArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.accountingItemSheetName).getDataRange().getValues()
    postObject.globalVar = globalVar
    postObject.actionId = postData.action.data.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardId = postData.action.data.board.id
    postObject.cardId = postData.action.data.card.id
    postObject.cardName = postData.action.data.card.name
    postObject.cfo = getCardList(globalVar, postObject.cardId).name
    postObject.bill = getAccountingItem(AccountingItemArray, postObject.cardName).bill
    postObject.account = getAccountingItem(AccountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.action.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      updateRowByActionId(globalVar, globalVar.sourceSheetID, globalVar.sourceSheetNameFactTrello, postObject)
      updateRowByActionId(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
      if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1) {
        textComment = getRestSum(globalVar, postObject).text
        updateCard(globalVar, postObject.cardId, textComment)
      }
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      updateRowByActionId(globalVar, globalVar.sourceSheetID, globalVar.sourceSheetNameBudgetTrello, postObject)
      updateRowByActionId(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
      textComment = getBudgetSum(globalVar, postObject).text
      updateCard(globalVar, postObject.cardId, textComment)
    }
  } else if (variable.actionType == 'deleteComment') {
    //* удаление строки при удалении комментария
    AccountingItemArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.accountingItemSheetName).getDataRange().getValues()
    postObject.globalVar = globalVar
    postObject.actionId = postData.action.data.action.id
    postObject.boardId = postData.action.data.board.id
    postObject.cardId = postData.action.data.card.id
    postObject.cardName = postData.action.data.card.name
    postObject.cfo = getCardList(globalVar, postObject.cardId).name
    postObject.bill = getAccountingItem(AccountingItemArray, postObject.cardName).bill
    postObject.account = getAccountingItem(AccountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      deleteRowByActionId(globalVar, globalVar.sourceSheetID, globalVar.sourceSheetNameFactTrello, postObject)
      deleteRowByActionId(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
      if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1) {
        textComment = getRestSum(globalVar, postObject).text
        updateCard(globalVar, postObject.cardId, textComment)
      }
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      deleteRowByActionId(globalVar, globalVar.sourceSheetID, globalVar.sourceSheetNameBudgetTrello, postObject)
      deleteRowByActionId(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
      textComment = getBudgetSum(globalVar, postObject).text
      updateCard(globalVar, postObject.cardId, textComment)
    }
  } else if (variable.actionType == 'updateCard' && ['Остатки (+)', 'Аванс (+)'].indexOf(postData.action.data.card.name) !== -1 && variable.idMemberCreator == '5e2b5f3f409c544ebdb1b9d4') {
    //* закрытие периода
    AccountingItemArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.accountingItemSheetName).getDataRange().getValues()
    postObject.globalVar = globalVar
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardId = postData.action.data.board.id
    postObject.cfo = parseListName(postData.action.data.list.name)
    postObject.listId = postData.action.data.list.id
    postObject.cardId = postData.action.data.card.id
    postObject.cardName = postData.action.data.card.name
    postObject.account = getAccountingItem(AccountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    if (postObject.account == 'Остатки' && globalVar.boardIdFact == postObject.boardId) {
      // updateFactPeriod(globalVar, postObject)
      // closedFactPeriod(globalVar, postObject, AccountingItemArray)
    } else if (postObject.account == 'Аванс' && globalVar.boardIdFact === postObject.boardId) {
      // closedBudgetPeriod(postObject)
    }
  }
}