function updateCard(globalVar, cardId, desc) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '?desc=' + desc + '&' + globalVar.keyAndToken, data)
}