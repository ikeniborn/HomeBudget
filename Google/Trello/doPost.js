function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
    console.log([formatterDate().timestamp, postData.action.type, postData.action.id, postData.action.memberCreator.username])
    var parseAction = ['commentCard', 'updateComment', 'deleteComment']
    if (parseAction.indexOf(postData.action.type) !== -1) {
      var postObject = getPostObject(postData)
      var ssTest = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName('test')
      ssTest.appendRow([postObject.webHookDate, postObject.actionType, postObject.actionId, postObject.memberUsername, postObject.isValidData])
      if (postObject.actionType == 'commentCard' && postObject.isUser && postObject.isValidData) {
        //* добавление информации
        updateTrelloData(postObject)
        postObject.cardComment = getSum(postObject).text
        updateCard(postObject)
        //* обновление фактической карточки при обновлении текущего бюджета
        if (postObject.isCurrBudget && postObject.isSamePeriod) {
          var factList = getList(postObject, postObject.boardIdFact)
          var factCard = getCards(postObject, factList.id).item
          var postObjectFact = postObject
          postObjectFact.boardId = postObject.boardIdFact
          postObjectFact.listId = factList.id
          postObjectFact.cardId = factCard.id
          postObjectFact.isFact = true
          postObjectFact.period = postObject.factPeriod
          postObjectFact.ymd = getYMD(postObject.factPeriod).ymd
          postObjectFact.cardComment = getSum(postObjectFact).text
          updateCard(postObjectFact)
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
        postObject.cardComment = getSum(postObject).text
        updateCard(postObject)
      } else if (postObject.actionType == 'deleteComment') {
        //* удаление строки при удалении комментария
        deleteRowByActionId(postObject)
        postObject.cardComment = getSum(postObject).text
        updateCard(postObject)
      }
    }
  } catch (e) {
    console.error('doPost: ' + e)
  }
}