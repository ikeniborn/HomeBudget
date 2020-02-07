function archiveAllCards(listId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'lists/' + listId + '/archiveAllCards?' + keyAndToken, data)
}