function addComment(cardId, text) {
  var globalVar = getVariable()
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/actions/comments?text=' + text + '&' + globalVar.keyAndToken, data)
}