function getPostObject(postData) {
  try {
    const postObject = getGlobalVariable()
    if (postData.action.type == 'commentCard') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.id
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
      } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = false
        postObject.isCurrFact = false
        postObject.isBudget = false
        postObject.isCurrBudget = false
        postObject.isTarget = true
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardDesc = ''
      postObject.balanceCardComment = ''
      postObject.cardLabelColor = getCardLabel(postObject).item.color
      postObject.list = null
      postObject.listId = postData.action.data.list.id
      postObject.listName = postData.action.data.list.name
      postObject.cfo = getFinancialСenter(postObject).item.cfo
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.useDesc = postObject.accountingItem.item.useDesc
      postObject.text = postData.action.data.text
      postObject.parseText = parseComment(postObject)
      postObject.sum = postObject.parseText.sum
      postObject.comment = postObject.parseText.comment
      postObject.mvz = getCostСenter(postObject).item.mvz
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
      postObject.factPeriod0 = postObject.date.factPeriod0
      postObject.factPeriod = postObject.date.factPeriod
      postObject.budgetPeriod = postObject.date.budgetPeriod
      postObject.budgetPeriod2 = postObject.date.budgetPeriod2
      postObject.budgetPeriod3 = postObject.date.budgetPeriod3
      postObject.isSamePeriod = postObject.date.isSamePeriod
      postObject.isValidData = isValidData(postObject)
    } else if (postData.action.type == 'updateComment') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.data.action.id
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
      } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = false
        postObject.isCurrFact = false
        postObject.isBudget = false
        postObject.isCurrBudget = false
        postObject.isTarget = true
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardDesc = ''
      postObject.balanceCardComment = ''
      postObject.cardLabelColor = getCardLabel(postObject).item.color
      postObject.list = getCardList(postObject)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
      postObject.cfo = getFinancialСenter(postObject).item.cfo
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.useDesc = postObject.accountingItem.item.useDesc
      postObject.text = postData.action.data.action.text
      postObject.parseText = parseComment(postObject)
      postObject.sum = postObject.parseText.sum
      postObject.comment = postObject.parseText.comment
      postObject.mvz = getCostСenter(postObject).item.mvz
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
      postObject.factPeriod0 = postObject.date.factPeriod0
      postObject.factPeriod = postObject.date.factPeriod
      postObject.budgetPeriod = postObject.date.budgetPeriod
      postObject.budgetPeriod2 = postObject.date.budgetPeriod2
      postObject.budgetPeriod3 = postObject.date.budgetPeriod3
      postObject.isSamePeriod = postObject.date.isSamePeriod
      postObject.isValidData = isValidData(postObject)
    } else if (postData.action.type == 'deleteComment') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.data.action.id
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
      } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = false
        postObject.isCurrFact = false
        postObject.isBudget = false
        postObject.isCurrBudget = false
        postObject.isTarget = true
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardDesc = ''
      postObject.balanceCardComment = ''
      postObject.cardLabelColor = getCardLabel(postObject).item.color
      postObject.list = getCardList(postObject)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
      postObject.cfo = getFinancialСenter(postObject).item.cfo
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.useDesc = postObject.accountingItem.item.useDesc
      postObject.text = ''
      postObject.parseText = ''
      postObject.sum = 0
      postObject.comment = ''
      postObject.mvz = ''
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
      postObject.factPeriod0 = postObject.date.factPeriod0
      postObject.factPeriod = postObject.date.factPeriod
      postObject.budgetPeriod = postObject.date.budgetPeriod
      postObject.budgetPeriod2 = postObject.date.budgetPeriod2
      postObject.budgetPeriod3 = postObject.date.budgetPeriod3
      postObject.isSamePeriod = postObject.date.isSamePeriod
      postObject.isValidData = isValidData(postObject)
    } else if (postData.action.type == 'createList') {
      //* данные по новой цели
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.id
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
      } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = false
        postObject.isCurrFact = false
        postObject.isBudget = false
        postObject.isCurrBudget = false
        postObject.isTarget = true
      }
      postObject.cardId = null
      postObject.cardName = ''
      postObject.cardDesc = ''
      postObject.balanceCardComment = ''
      postObject.cardLabelColor = ''
      postObject.list = null
      postObject.listId = postData.action.data.list.id
      postObject.listName = postData.action.data.list.name
      postObject.cfo = getFinancialСenter(postObject).item.cfo
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.useDesc = postObject.accountingItem.item.useDesc
      postObject.text = ''
      postObject.parseText = ''
      postObject.sum = 0
      postObject.comment = ''
      postObject.mvz = ''
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
      postObject.factPeriod0 = postObject.date.factPeriod0
      postObject.factPeriod = postObject.date.factPeriod
      postObject.budgetPeriod = postObject.date.budgetPeriod
      postObject.budgetPeriod2 = postObject.date.budgetPeriod2
      postObject.budgetPeriod3 = postObject.date.budgetPeriod3
      postObject.isSamePeriod = postObject.date.isSamePeriod
      postObject.isValidData = isValidData(postObject)
    }
    return postObject
  } catch (e) {
    console.error('getPostObject: ' + e)
  }
}