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
        //* добавление информации
        updateTrelloData(postObject)
        var description = getDescription(postObject)
        postObject.cardDescription = description.text
        var comment = getComment(postObject)
        postObject.cardComment = comment.text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
        if (postObject.isCurrFact && !postObject.isSamePeriod) {
          //* обновление карточек бюджета по данным факта
          if (!postObject.isSamePeriod && ['Остатки'].indexOf(postObject.account) === -1) {
            var budgetList = getList(postObject, postObject.boardIdBudget)
            var budgetCard = getCards(postObject, budgetList.id).item
            var postObjectBudget = JSON.parse(JSON.stringify(postObject))
            postObjectBudget.boardId = postObject.boardIdFact
            postObjectBudget.listId = budgetList.id
            postObjectBudget.cardId = budgetCard.id
            postObjectBudget.isFact = false
            postObjectBudget.isCurrFact = false
            postObjectBudget.isBudget = true
            postObjectBudget.isCurrBudget = true
            postObjectBudget.period = postObject.budgetPeriod
            postObjectBudget.ymd = getYMD(postObject.budgetPeriod).ymd
            postObjectBudget.cardDescription = getDescription(postObjectBudget).text
            updateCardDesc(postObjectBudget)
          }
          //* закрытие периода
          if (['Остатки'].indexOf(postObject.account) !== -1 && !postObject.isSamePeriod) {
            updateFactPeriod(postObject)
            closedFactPeriod(postObject)
            // reportBudgetOksana(postObject)
          } else if (['Аванс'].indexOf(postObject.account) !== -1 && postObject.isSamePeriod) {
            updateBudgetPeriod(postObject)
            closedBudgetPeriod(postObject)
          }
        } else if (postObject.isCurrBudget) {
          if (postObject.isSamePeriod) {
            //* обновление фактической карточки при обновлении текущего бюджета
            var factList = getList(postObject, postObject.boardIdFact)
            var factCard = getCards(postObject, factList.id).item
            var postObjectFact = JSON.parse(JSON.stringify(postObject))
            postObjectFact.boardId = postObject.boardIdFact
            postObjectFact.listId = factList.id
            postObjectFact.cardId = factCard.id
            postObjectFact.isFact = true
            postObjectFact.isCurrFact = true
            postObjectFact.isBudget = false
            postObjectFact.isCurrBudget = false
            postObjectFact.period = postObject.factPeriod
            postObjectFact.ymd = getYMD(postObject.factPeriod).ymd
            postObjectFact.cardDescription = getDescription(postObjectFact).text
            updateCardDesc(postObjectFact)
          }
        }
        //* добавление реакции на комментарий
        addCardReaction(postObject)
      } else if (postObject.actionType == 'updateComment') {
        //* обновление данных при изменении комментария
        updateRowByActionId(postObject)
        var description = getDescription(postObject)
        postObject.cardDescription = description.text
        var comment = getComment(postObject)
        postObject.cardComment = comment.text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
      } else if (postObject.actionType == 'deleteComment') {
        //* удаление строки при удалении комментария
        var deleteRow = deleteRowByActionId(postObject)
        postObject.sum = deleteRow.sum
        var description = getDescription(postObject)
        postObject.cardDescription = description.text
        var comment = getComment(postObject)
        postObject.cardComment = comment.text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
      } else if (postObject.actionType == 'createList' && postObject.isTarget) {
        //* создание новой цели
      }
    }
  } catch (e) {
    console.error('doPost: ' + e)
  }
}