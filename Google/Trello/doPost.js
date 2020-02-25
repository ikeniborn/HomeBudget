function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents)
    const variable = {}
    variable.webHookDate = formatterDate().timestamp
    variable.actionType = postData.action.type !== undefined ? postData.action.type : null
    variable.actionId = postData.action.id !== undefined ? postData.action.id : null
    variable.username = postData.action.memberCreator.username !== undefined ? postData.action.memberCreator.username : null
    console.log(variable)
    var parseAction = ['commentCard', 'updateComment', 'deleteComment']
    if (parseAction.indexOf(variable.actionType) !== -1) {
      var globalVar = getVariable()
      var postObject = getPostObject(globalVar, postData)
      var textComment
      var ssTest = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName('test')
      ssTest.appendRow([variable.webHookDate, variable.actionType, variable.actionId, variable.username, checkActionId(globalVar, postObject)])
    }
    if (variable.actionType == 'commentCard') {
      if (variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4' && checkActionId(globalVar, postObject) == 0) {
        //* добавление информации в учет
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
          if (postObject.sum > 500) {
            addReaction(globalVar, postObject.actionId, globalVar.scream)
          } else {
            addReaction(globalVar, postObject.actionId, globalVar.buuReaction)
          }
          addReaction(globalVar, postObject.actionId, globalVar.moneyBag)
        } else {
          addReaction(globalVar, postObject.actionId, globalVar.moneyBag)
        }
        //* закрытие периода
        if ([globalVar.boardIdFact].indexOf(postObject.boardId) !== -1) {
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
    } else if (variable.actionType == 'updateComment' && variable.idMemberCreator !== '5e2b5f3f409c544ebdb1b9d4') {
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
    } else if (variable.actionType == 'deleteComment') {
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
  } catch (e) {
    console.error('doPost: ' + e)
  } finally {
    console.log('doPost: complete')
  }
}