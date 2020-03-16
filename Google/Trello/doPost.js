function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
    console.log([formatterDate().timestamp, postData.action.type, postData.action.id, postData.action.memberCreator.username])
    var parseAction = ['commentCard', 'updateComment', 'deleteComment', 'createList']
    var botUser = ['5e2b5f3f409c544ebdb1b9d4']
    if (parseAction.indexOf(postData.action.type) !== -1 && botUser.indexOf(postData.action.memberCreator.id) === -1) {
      var postObject = getPostObject(postData)
      var ssTest = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName('test')
      ssTest.appendRow([postObject.webHookDate, postObject.actionType, postObject.actionId, postObject.memberUsername, postObject.isValidData])
      if (postObject.actionType == 'commentCard' && postObject.isValidData) {
        try {
          //* добавление информации
          updateTrelloData(postObject)
          postObject.cardDescription = getDescription(postObject).text
          postObject.cardComment = getComment(postObject).text
          //* обновление описание карточки
          updateCardDesc(postObject)
          //* обновление карточки баланса
          updateBalanceCard(postObject)
          //* закрытие периода
        } finally {
          if (postObject.isCurrFact && ['Остатки'].indexOf(postObject.account) !== -1 && !postObject.isSamePeriod) {
            updateFactPeriod(postObject)
            closedFactPeriod(postObject)
            updateDescForNewCards(postObject)
            // reportBudgetOksana(postObject)
          } else if (postObject.isCurrFact && ['Аванс'].indexOf(postObject.account) !== -1 && postObject.isSamePeriod) {
            updateBudgetPeriod(postObject)
            closedBudgetPeriod(postObject)
          }
        }
        // if (postObject.isCurrFact && !postObject.isSamePeriod) {
        //   //* обновление карточек бюджета по данным факта
        //   if (!postObject.isSamePeriod && ['Остатки'].indexOf(postObject.account) === -1) {
        //     var budgetList = getList(postObject, postObject.boardIdBudget)
        //     var budgetCard = getCards(postObject, budgetList.id).item
        //     var postObjectBudget = JSON.parse(JSON.stringify(postObject))
        //     postObjectBudget.boardId = postObject.boardIdFact
        //     postObjectBudget.listId = budgetList.id
        //     postObjectBudget.cardId = budgetCard.id
        //     postObjectBudget.isFact = false
        //     postObjectBudget.isCurrFact = false
        //     postObjectBudget.isBudget = true
        //     postObjectBudget.isCurrBudget = true
        //     postObjectBudget.period = postObject.budgetPeriod
        //     postObjectBudget.ymd = getYMD(postObject.budgetPeriod).ymd
        //     postObjectBudget.cardDescription = getDescription(postObjectBudget).text
        //     updateCardDesc(postObjectBudget)
        //   }
        // } else if (postObject.isCurrBudget) {
        //   if (postObject.isSamePeriod) {
        //     //* обновление фактической карточки при обновлении текущего бюджета
        //     var factList = getList(postObject, postObject.boardIdFact)
        //     var factCard = getCards(postObject, factList.id).item
        //     var postObjectFact = JSON.parse(JSON.stringify(postObject))
        //     postObjectFact.boardId = postObject.boardIdFact
        //     postObjectFact.listId = factList.id
        //     postObjectFact.cardId = factCard.id
        //     postObjectFact.isFact = true
        //     postObjectFact.isCurrFact = true
        //     postObjectFact.isBudget = false
        //     postObjectFact.isCurrBudget = false
        //     postObjectFact.period = postObject.factPeriod
        //     postObjectFact.ymd = getYMD(postObject.factPeriod).ymd
        //     postObjectFact.cardDescription = getDescription(postObjectFact).text
        //     updateCardDesc(postObjectFact)
        //   }
        // }
        //* добавление реакции на комментарий
        addCardReaction(postObject)
      } else if (postObject.actionType == 'updateComment' && !postObject.isValidData) {
        //* обновление данных при изменении комментария
        try {
          updateRowByActionId(postObject)
        } finally {
          postObject.cardDescription = getDescription(postObject).text
          postObject.cardComment = getComment(postObject).text
          //* обновление описание карточки
          updateCardDesc(postObject)
          //* обновление карточки баланса
          updateBalanceCard(postObject)
        }
      } else if (postObject.actionType == 'deleteComment' && !postObject.isValidData) {
        //* удаление строки при удалении комментария
        try {
          postObject.sum = deleteRowByActionId(postObject).sum
        } finally {
          postObject.cardDescription = getDescription(postObject).text
          postObject.cardComment = getComment(postObject).text
          //* обновление описание карточки
          updateCardDesc(postObject)
          //* обновление карточки баланса
          updateBalanceCard(postObject)
        }
      } else if (postObject.actionType == 'createList' && postObject.isTarget) {
        if (postObject.isFact || postObject.isBudget) {
          addFinancialCenter(postObject)
        } else if (postObject.isTarget) {
          // addTarget(postObject)
        }
        //* создание карточек для нового листа
        createCardsForList(postObject)
      }
    }
  } catch (e) {
    console.error('doPost: ' + e)
  }
}