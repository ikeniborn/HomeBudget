function updateList(listId, listName) {
  var globalVar = getVariable()
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '?name=' + listName + '&' + globalVar.keyAndToken, data)
}