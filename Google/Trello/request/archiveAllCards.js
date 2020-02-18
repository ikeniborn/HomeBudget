function archiveAllCards(globalVar, listId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/archiveAllCards?' + globalVar.keyAndToken, data)
}