function doPost(e) {
  const postData = JSON.parse(e.postData.contents)
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName('test')
  ss.getRange(1, 1).setValue(postData)
  const variable = {}
  variable.idMemberCreator = postData.action.idMemberCreator !== undefined ? postData.action.idMemberCreator : null
  variable.actionType = postData.action.type !== undefined ? postData.action.type : null
  console.log(variable)
  if (variable.actionType == 'commentCard' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
    var sourceSheetName
    var maxDate
    // добавление информации в учет
    var postObject = {}
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.boardName = postData.action.data.board.name
    postObject.boardId = postData.action.data.board.id
    postObject.cardName = postData.action.data.card.name
    postObject.cardId = postData.action.data.card.id
    postObject.listId = postData.action.data.list.id
    postObject.listName = postData.action.data.list.name
    postObject.bill = getAccountingItem(sourceSheetID, accountingItemSheetName, postObject.cardName).bill
    postObject.account = getAccountingItem(sourceSheetID, accountingItemSheetName, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.memberCreator = postData.action.memberCreator.username
    if (postObject.account == 'Зарплата') {
      updateFactPeriod(postObject)
      // архивирование факта прошлого периода
      var listFact0 = getList(boardIdFact0)
      listFact0.forEach(function (list) {
        closedList(list.id)
      })
      // перенос факта в прошлый период
      var listFact = getList(boardIdFact)
      listFact.forEach(function (list) {
        moveList(listId, boardIdFact0)
      })
      var boardNameFact0 = 'Факт' + getParametr(sourceSheetID, parametrSheetName, 'periodFactIlya').value
      updateBoard(boardIdFact0, boardNameFact0)
    } else if (postObject.account == 'Аванс') {
      updateBudgetPeriod(postObject)
      // архивирование текущего бюджета
      var listBudget = getList(boardIdBudget)
      listBudget.forEach(function (list) {
        closedList(list.id)
      })
      // перенос бюджета +1 на текущий бюджет
      var listBudget2 = getList(boardIdBudget2)
      listBudget2.forEach(function (list) {
        moveList(listId, boardIdBudget)
      })
      // перенос бюджета +2 на текущий бюджет+1
      var listBudget3 = getList(boardIdBudget3)
      listBudget3.forEach(function (list) {
        moveList(listId, boardIdBudget2)
      })
    }
    postObject.period = getPeriod(postObject.boardId, postData.action.data.list.name).period
    postObject.ymd = getPeriod(postObject.boardId, postData.action.data.list.name).ymd
    console.log(postObject)
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
      }
    }
    // добавление реакции на комментарий
    if (postObject.memberCreator == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postObject.actionId, jackdawReaction)
    }
  } else if (variable.actionType == 'deleteComment') {
    // удаление строки при удалении комментария
    var postObject = {}
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