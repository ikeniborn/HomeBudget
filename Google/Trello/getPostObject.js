function getPostObject(postData) {
  try {
    const postObject = getGlobalVariable()
    if (postData.action.type == 'commentCard') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.id
      postObject.isValidData = isValidData(postObject)
      postObject.actionDate = new Date(postData.action.date)
      postObject.memberId = postData.action.memberCreator.id
      postObject.memberUsername = postData.action.memberCreator.username
      if (postObject.memberId !== '5e2b5f3f409c544ebdb1b9d4') {
        postObject.isUser = true
      } else {
        postObject.isUser = false
      }
      postObject.boardId = postData.action.data.board.id
      postObject.boardName = postData.action.data.board.name
      if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = true
      } else {
        postObject.isFact = false
      }
      if ([postObject.boardIdFact].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrFact = true
      } else {
        postObject.isCurrFact = false
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardComment = null
      postObject.list = null
      postObject.listId = postData.action.data.list.id
      postObject.listName = parseListName(postData.action.data.list.name)
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.text = postData.action.data.text
      postObject.parseText = parseComment(postObject.text)
      postObject.sum = postObject.parseText.sum
      postObject.comment = postObject.parseText.comment
      postObject.mvz = postObject.parseText.mvz
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
    } else if (postData.action.type == 'updateComment') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.data.action.id
      postObject.isValidData = isValidData(postObject)
      postObject.actionDate = new Date(postData.action.date)
      postObject.memberId = postData.action.memberCreator.id
      postObject.memberUsername = postData.action.memberCreator.username
      if (postObject.memberId !== '5e2b5f3f409c544ebdb1b9d4') {
        postObject.isUser = true
      } else {
        postObject.isUser = false
      }
      postObject.boardId = postData.action.data.board.id
      postObject.boardName = postData.action.data.board.name
      if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = true
      } else {
        postObject.isFact = false
      }
      if ([postObject.boardIdFact].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrFact = true
      } else {
        postObject.isCurrFact = false
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardComment = null
      postObject.list = getCardList(postObject)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.text = postData.action.data.action.text
      postObject.parseText = parseComment(postObject.text)
      postObject.sum = postObject.parseText.sum
      postObject.comment = postObject.parseText.comment
      postObject.mvz = postObject.parseText.mvz
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
    } else if (postData.action.type == 'deleteComment') {
      postObject.webHookDate = formatterDate().timestamp
      postObject.actionType = postData.action.type
      postObject.actionId = postData.action.data.action.id
      postObject.isValidData = isValidData(postObject)
      postObject.actionDate = new Date(postData.action.date)
      postObject.memberId = postData.action.memberCreator.id
      postObject.memberUsername = postData.action.memberCreator.username
      if (postObject.memberId !== '5e2b5f3f409c544ebdb1b9d4') {
        postObject.isUser = true
      } else {
        postObject.isUser = false
      }
      postObject.boardId = postData.action.data.board.id
      postObject.boardName = postData.action.data.board.name
      if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
        postObject.isFact = true
      } else {
        postObject.isFact = false
      }
      if ([postObject.boardIdFact].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrFact = true
      } else {
        postObject.isCurrFact = false
      }
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardComment = null
      postObject.list = getCardList(postObject, postObject.cardId)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      postObject.text = null
      postObject.sum = null
      postObject.comment = null
      postObject.mvz = null
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
    }
    return postObject
  } catch (e) {
    console.error('getPostObject: ' + e)
  }
}