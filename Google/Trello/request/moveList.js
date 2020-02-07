function moveList(listId, boardId) {
  var globalVar = getVariable()
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/idBoard?value=' + boardId + '&' + globalVar.keyAndToken, data)
}