function doPost(e) {
  try {
    const parseAction = ['commentCard', 'updateComment', 'deleteComment', 'createList']
    const botUser = ['5e2b5f3f409c544ebdb1b9d4']
    var postData = JSON.parse(e.postData.contents)
    if (parseAction.indexOf(postData.action.type) !== -1 && botUser.indexOf(postData.action.memberCreator.id) === -1 && addLog(postData)) {
      var postObject = getPostObject(postData)
      if (postObject.actionType == 'commentCard') {
        //* добавление информации
        updateTrelloData(postObject)
        //* получение описание карточки и комментария
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
        //* закрытие периода
        if (postObject.isCurrFact && ['Остатки'].indexOf(postObject.account) !== -1 && !postObject.isSamePeriod) {
          updateFactPeriod(postObject)
          closedFactPeriod(postObject)
          updateDescForNewCards(postObject)
          // reportBudgetOksana(postObject)
        } else if (postObject.isCurrFact && ['Аванс'].indexOf(postObject.account) !== -1 && postObject.isSamePeriod) {
          updateBudgetPeriod(postObject)
          closedBudgetPeriod(postObject)
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
      } else if (postObject.actionType == 'updateComment' && postObject.isOldData) {
        //* обновление данных при изменении комментария
        updateRowByActionId(postObject)
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
        addCardReaction(postObject)
      } else if (postObject.actionType == 'deleteComment' && postObject.isOldData) {
        //* удаление строки при удалении комментария
        postObject.sum = deleteRowByActionId(postObject)
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
      } else if (postObject.actionType == 'createList') {
        if (postObject.isFact || postObject.isBudget) {
          addFinancialCenter(postObject)
          createCardsForList(postObject)
          updateDescForNewCards(postObject)
        } else if (postObject.isTarget) {
          addTarget(postObject)
          createCardsForList(postObject)
        }
      }

    }
  } catch (e) {
    console.error('doPost: ' + e)
  }
}