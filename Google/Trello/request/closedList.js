function closedList(listId) {
  var globalVar = getVariable()
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/closed?value=true&' + globalVar.keyAndToken, data)
}