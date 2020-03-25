function doPost(e) {
  try {
    const parseAction = ['commentCard', 'updateComment', 'deleteComment', 'createList']
    const botUser = ['5e2b5f3f409c544ebdb1b9d4']
    var postData = JSON.parse(e.postData.contents)
    if (parseAction.indexOf(postData.action.type) !== -1 && botUser.indexOf(postData.action.memberCreator.id) === -1 && addLog(postData)) {
      var postObject = getPostObject(postData)
      if (postObject.actionType == 'commentCard') {
        //* закрытие периода
        if (postObject.isCurrFact && ['Остатки'].indexOf(postObject.account) !== -1 && !postObject.isSamePeriod) {
          closedFactPeriod(postObject)
          updateDescForNewCards(postObject)
          // reportBudgetOksana(postObject)
        } else if (postObject.isCurrFact && ['Аванс'].indexOf(postObject.account) !== -1 && postObject.isSamePeriod) {
          closedBudgetPeriod(postObject)
        }
        //* добавление информации
        updateTrelloData(postObject)
        //* получение описание карточки и комментария
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
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