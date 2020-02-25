function getPostObject(globalVar, postData) {
  const postObject = {}
  if (postData.action.type == 'commentCard') {
    postObject.globalVar = globalVar
    postObject.webHookDate = formatterDate().timestamp
    postObject.actionType = postData.action.type
    postObject.actionId = postData.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.memberId = postData.action.memberCreator.id
    postObject.memberUsername = postData.action.memberCreator.username
    postObject.boardId = postData.action.data.board.id
    postObject.boardName = postData.action.data.board.name
    postObject.listId = postData.action.data.list.id
    postObject.cfo = parseListName(postData.action.data.list.name)
    postObject.cardName = postData.action.data.card.name
    postObject.cardId = postData.action.data.card.id
    postObject.bill = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).bill
    postObject.account = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.mvz = parseComment(postObject.text, postObject.cfo).mvz
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
  } else if (postData.action.type == 'updateComment') {
    postObject.globalVar = globalVar
    postObject.webHookDate = formatterDate().timestamp
    postObject.actionType = postData.action.type
    postObject.actionId = postData.action.data.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.memberId = postData.action.memberCreator.id
    postObject.memberUsername = postData.action.memberCreator.username
    postObject.boardId = postData.action.data.board.id
    postObject.boardName = postData.action.data.board.name
    postObject.cardId = postData.action.data.card.id
    postObject.cardName = postData.action.data.card.name
    postObject.listId = getCardList(globalVar, postObject.cardId).id
    postObject.cfo = getCardList(globalVar, postObject.cardId).name
    postObject.bill = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).bill
    postObject.account = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = postData.action.data.action.text
    postObject.sum = parseComment(postObject.text).sum
    postObject.comment = parseComment(postObject.text).comment
    postObject.mvz = parseComment(postObject.text, postObject.cfo).mvz
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
  } else if (postData.action.type == 'deleteComment') {
    postObject.globalVar = globalVar
    postObject.webHookDate = formatterDate().timestamp
    postObject.actionType = postData.action.type
    postObject.actionId = postData.action.data.action.id
    postObject.actionDate = new Date(postData.action.date)
    postObject.memberId = postData.action.memberCreator.id
    postObject.memberUsername = postData.action.memberCreator.username
    postObject.boardId = postData.action.data.board.id
    postObject.boardName = postData.action.data.board.name
    postObject.cardId = postData.action.data.card.id
    postObject.cardName = postData.action.data.card.name
    postObject.listId = getCardList(globalVar, postObject.cardId).id
    postObject.cfo = getCardList(globalVar, postObject.cardId).name
    postObject.bill = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).bill
    postObject.account = getAccountingItem(globalVar.accountingItemArray, postObject.cardName).account
    postObject.nomenclature = postData.action.data.card.name
    postObject.text = null
    postObject.sum = null
    postObject.comment = null
    postObject.mvz = null
    postObject.period = getPeriod(globalVar, postObject.boardId, postObject.cfo).period
    postObject.ymd = getPeriod(globalVar, postObject.boardId, postObject.cfo).ymd
  }
  return postObject
}