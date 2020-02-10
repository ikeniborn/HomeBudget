function updateList(globalVar, listId, listName) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '?name=' + listName + '&' + globalVar.keyAndToken, data)
}