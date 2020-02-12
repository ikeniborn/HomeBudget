function closeCard(globalVar, cardId) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + '/cards/' + cardId + '?closed=true&' + globalVar.keyAndToken, data)
}