function getPostObject(postData) {
  try {
    const postObject = getGlobalVariable()
    postObject.webHookDate = formatterDate().timestamp
    postObject.actionType = postData.action.type
    if (postData.action.type == 'deleteComment') {
      postObject.actionId = postData.action.data.action.id
    } else {
      postObject.actionId = postData.action.id
    }
    postObject.actionDate = new Date(postData.action.date)
    postObject.memberId = postData.action.memberCreator.id
    postObject.memberUsername = postData.action.memberCreator.username
    postObject.boardId = postData.action.data.board.id
    postObject.boardName = postData.action.data.board.name
    if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = true
      if ([postObject.boardIdFact].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrFact = true
      } else {
        postObject.isCurrFact = true
      }
      postObject.isBudget = false
      postObject.isCurrBudget = false
      postObject.isTarget = false
      postObject.source = 'Факт'
    } else if ([postObject.boardIdBudget, postObject.boardIdBudget2, postObject.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = false
      postObject.isCurrFact = false
      postObject.isBudget = true
      if ([postObject.boardIdBudget].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrBudget = true
      } else {
        postObject.isCurrBudget = false
      }
      postObject.isTarget = false
      postObject.source = 'Бюджет'
    } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = false
      postObject.isCurrFact = false
      postObject.isBudget = false
      postObject.isCurrBudget = false
      postObject.isTarget = true
      postObject.source = 'Цель'
    }
    if (postData.action.type == 'createList') {
      postObject.cardId = ''
      postObject.cardName = ''
      postObject.cardDescription = ''
      postObject.cardComment = ''
      postObject.cardLabelColor = ''
    } else {
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardDescription = ''
      postObject.cardComment = ''
      postObject.cardLabelColor = getCardLabel(postObject).item.color
    }
    if (['commentCard', 'createList'].indexOf(postData.action.type) !== -1) {
      postObject.list = {}
      postObject.listId = postData.action.data.list.id
      postObject.listName = postData.action.data.list.name
    } else if (['updateComment', 'deleteComment'].indexOf(postData.action.type) !== -1) {
      postObject.list = getCardList(postObject)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
    }
    postObject.cfo = getFinancialСenter(postObject).item.cfo
    if (['Илья', 'Оксана'].indexOf(postObject.cfo) !== -1) {
      postObject.privateBudget = true
    } else {
      postObject.privateBudget = false
    }
    postObject.accountingItem = getAccountingItem(postObject)
    postObject.cashFlow = postObject.accountingItem.item.cashFlow
    postObject.bill = postObject.accountingItem.item.bill
    postObject.account = postObject.accountingItem.item.account
    postObject.nomenclature = postData.action.data.card.name
    if (['deleteComment', 'createList'].indexOf(postData.action.type) !== -1) {
      postObject.text = ''
      postObject.parseText = ''
      postObject.sum = 0
      postObject.comment = ''
      postObject.mvz = ''
    } else {
      postObject.text = postData.action.data.text
      postObject.parseText = parseComment(postObject)
      postObject.sum = postObject.parseText.sum
      postObject.comment = postObject.parseText.comment
      postObject.mvz = getCostСenter(postObject).item.mvz
    }
    postObject.date = getPeriod(postObject)
    postObject.period = postObject.date.period
    postObject.ymd = postObject.date.ymd
    postObject.factPeriod0 = postObject.date.factPeriod0
    postObject.factPeriod = postObject.date.factPeriod
    postObject.budgetPeriod = postObject.date.budgetPeriod
    postObject.budgetPeriod2 = postObject.date.budgetPeriod2
    postObject.budgetPeriod3 = postObject.date.budgetPeriod3
    postObject.isSamePeriod = postObject.date.isSamePeriod
    postObject.dataTrello = getAllData(postObject, 'trello')
    postObject.dataTrelloAllCurr = postObject.dataTrello.allCurr
    postObject.dataAccount = getAllData(postObject, 'account')
    postObject.dataAccountAllCurr = postObject.dataAccount.allCurr
    postObject.dataAccountFactCurr = postObject.dataAccount.factCurr
    postObject.dataAccountBudgetCurr = postObject.dataAccount.budgetCurr
    if (postData.action.type == 'commentCard') {
      postObject.isValidData = isValidData(postObject)
    } else {
      postObject.isValidData = false
    }
    return postObject
  } catch (e) {
    console.error('getPostObject: ' + e)
  }
}