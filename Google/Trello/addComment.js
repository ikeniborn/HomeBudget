function addComment(cardId, text) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'cards/' + cardId + '/actions/comments?text=' + text + '&' + keyAndToken, data)
}