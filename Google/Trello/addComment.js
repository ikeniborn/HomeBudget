function addComment(apiRoot, apiToken, apiKey, idCart, text) {
  var keyAndToken = 'key=' + apiKey + '&token=' + apiToken
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'cards/' + idCart + '/actions/comments?text=' + text + '&' + keyAndToken, data)
}