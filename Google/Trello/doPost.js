function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
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
        //* добавление реакции на комментарий
        addCardReaction(postObject)
        //* закрытие периода
        if (postObject.isCurrFact && ['Остатки', 'Аванс'].indexOf(postObject.account) !== -1) {
          var factPeriod = getYMD(postObject.factPeriod).ymd
          var budgetPeriod = getYMD(postObject.budgetPeriod).ymd
          if (postObject.account == 'Остатки' && factPeriod != budgetPeriod) {
            updateFactPeriod(postObject)
            closedFactPeriod(postObject)
            // reportBudgetOksana(postObject)
          } else if (postObject.account == 'Аванс' && factPeriod == budgetPeriod) {
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