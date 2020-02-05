function updateCard(cardId, desc) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'cards/' + cardId + '?desc=' + desc + '&' + keyAndToken, data)
}