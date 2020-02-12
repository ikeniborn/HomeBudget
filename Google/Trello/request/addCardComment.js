function addCardComment(globalVar, cardId, comment) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/actions/comments?text=' + comment + '&' + globalVar.keyAndToken, data)
}