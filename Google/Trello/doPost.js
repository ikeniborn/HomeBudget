function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
    console.log([formatterDate().timestamp, postData.action.type, postData.action.id, postData.action.memberCreator.username])
    var parseAction = ['commentCard', 'updateComment', 'deleteComment', 'createList']
    if (parseAction.indexOf(postData.action.type) !== -1) {
      var postObject = getPostObject(postData)
      var ssTest = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName('test')
      ssTest.appendRow([postObject.webHookDate, postObject.actionType, postObject.actionId, postObject.memberUsername, postObject.isValidData])
      if (postObject.actionType == 'commentCard' && postObject.isUser && postObject.isValidData) {
        //* добавление информации
        updateTrelloData(postObject)
        var sumData = getSum(postObject)
        postObject.cardDesc = sumData.desc
        postObject.cardComment = sumData.comment
        updateCardDesc(postObject)
        if (postObject.isCurrFact) {
          //* обновление карточки баланса
          updateBalanceCard(postObject)
          //* обновление карточек бюджета по данным факта
          if (!postObject.isSamePeriod) {
            var budgetList = getList(postObject, postObject.boardIdBudget)
            var budgetCard = getCards(postObject, budgetList.id).item
            var postObjectBudget = postObject
            postObjectBudget.boardId = postObject.boardIdFact
            postObjectBudget.listId = budgetList.id
            postObjectBudget.cardId = budgetCard.id
            postObjectBudget.isFact = false
            postObjectBudget.isCurrFact = false
            postObjectBudget.isBudget = true
            postObjectBudget.isCurrBudget = true
            postObjectBudget.period = postObject.budgetPeriod
            postObjectBudget.ymd = getYMD(postObject.budgetPeriod).ymd
            postObjectBudget.cardDesc = getSum(postObjectBudget).desc
            updateCardDesc(postObjectBudget)
          }
        } else if (postObject.isCurrBudget) {
          updateBalanceCard(postObject)
          if (postObject.isSamePeriod) {
            //* обновление фактической карточки при обновлении текущего бюджета
            var factList = getList(postObject, postObject.boardIdFact)
            var factCard = getCards(postObject, factList.id).item
            var postObjectFact = postObject
            postObjectFact.boardId = postObject.boardIdFact
            postObjectFact.listId = factList.id
            postObjectFact.cardId = factCard.id
            postObjectFact.isFact = true
            postObjectFact.isCurrFact = true
            postObjectFact.isBudget = false
            postObjectFact.isCurrBudget = false
            postObjectFact.period = postObject.factPeriod
            postObjectFact.ymd = getYMD(postObject.factPeriod).ymd
            postObjectFact.cardDesc = getSum(postObjectFact).desc
            updateCardDesc(postObjectFact)
          }
        }
        //* добавление реакции на комментарий
        addCardReaction(postObject)
        //* закрытие периода
        if (postObject.isCurrFact && ['Остатки', 'Аванс'].indexOf(postObject.account) !== -1) {
          if (postObject.account == 'Остатки' && !postObject.isSamePeriod) {
            updateFactPeriod(postObject)
            closedFactPeriod(postObject)
            // reportBudgetOksana(postObject)
          } else if (postObject.account == 'Аванс' && postObject.isSamePeriod) {
            updateBudgetPeriod(postObject)
            closedBudgetPeriod(postObject)
          }
        }
      } else if (postObject.actionType == 'updateComment' && postObject.isUser) {
        //* обновление данных при изменении комментария
        updateRowByActionId(postObject)
        var sumData = getSum(postObject)
        postObject.cardDesc = sumData.desc
        postObject.cardComment = sumData.comment
        updateCardDesc(postObject)
        if (postObject.isCurrFact) {
          updateBalanceCard(postObject)
        }
      } else if (postObject.actionType == 'deleteComment' && postObject.isUser) {
        //* удаление строки при удалении комментария
        deleteRowByActionId(postObject)
        var sumData = getSum(postObject)
        postObject.cardDesc = sumData.desc
        postObject.cardComment = sumData.comment
        updateCardDesc(postObject)
        if (postObject.isCurrFact) {
          updateBalanceCard(postObject)
        }
      } else if (postObject.actionType == 'createList' && postObject.isUser && postObject.isTarget) {
        //* создание новой цели
      }
    }
  } catch (e) {
    console.error('doPost: ' + e)
  }
}