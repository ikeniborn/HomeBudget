function archiveAllCards(listId) {
  var globalVar = getVariable()
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/archiveAllCards?' + globalVar.keyAndToken, data)
}