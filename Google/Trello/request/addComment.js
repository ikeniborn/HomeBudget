function addComment(globalVar, cardId, text) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/actions/comments?text=' + text + '&' + globalVar.keyAndToken, data)
}