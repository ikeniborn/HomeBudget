function updateCard(cardId, desc) {
  var globalVar = getVariable()
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '?desc=' + desc + '&' + globalVar.keyAndToken, data)
}