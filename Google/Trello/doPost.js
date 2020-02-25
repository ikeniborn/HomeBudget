function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
    var parseAction = ['commentCard', 'updateComment', 'deleteComment']
    if (parseAction.indexOf(postData.action.type) !== -1) {
      var globalVar = getVariable()
      var postObject = getPostObject(globalVar, postData)
      var isValidData = isNewData(globalVar, postObject)
      var textComment
      var ssTest = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName('test')
      ssTest.appendRow([postObject.webHookDate, postObject.actionType, postObject.actionId, postObject.memberUsername, isValidData])
      if (postObject.actionType == 'commentCard') {
        if (postObject.memberId !== '5e2b5f3f409c544ebdb1b9d4' && isValidData) {
          //* добавление информации в учет
          // var addComment = Promise()
          if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
            updateTrelloBuffer(globalVar, postObject)
            updateTrelloAccounting(globalVar, postObject)
            textComment = getRestSum(globalVar, postObject).text
            updateCard(globalVar, postObject.cardId, textComment)
          } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
            updateTrelloBuffer(globalVar, postObject)
            updateTrelloAccounting(globalVar, postObject)
            textComment = getBudgetSum(globalVar, postObject).text
            updateCard(globalVar, postObject.cardId, textComment)
          }
          //* добавление реакции на комментарий
          addReaction(globalVar, postObject)
          //* закрытие периода
          if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1 && ['Остатки', 'Аванс'].indexOf(postObject.account) !== -1) {
            var factPeriod = getPeriod(globalVar, globalVar.boardIdFact, postObject.cfo).ymd
            var budgetPeriod = getPeriod(globalVar, globalVar.boardIdBudget, postObject.cfo).ymd
            if (postObject.account == 'Остатки' && factPeriod != budgetPeriod) {
              updateFactPeriod(globalVar, postObject)
              closedFactPeriod(globalVar, postObject)
              // reportBudgetOksana(globalVar)
            } else if (postObject.account == 'Аванс' && factPeriod == budgetPeriod) {
              updateBudgetPeriod(globalVar, postObject)
              closedBudgetPeriod(globalVar, postObject)
            }
          }
        }
      } else if (postObject.actionType == 'updateComment' && postObject.memberId !== '5e2b5f3f409c544ebdb1b9d4') {
        //* обновление данных при изменении комментария
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
      } else if (postObject.actionType == 'deleteComment') {
        //* удаление строки при удалении комментария
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
      }
    }
  } catch (e) {
    console.error('doPost: ' + e)
  } finally {
    console.log('doPost: complete')
  }
}