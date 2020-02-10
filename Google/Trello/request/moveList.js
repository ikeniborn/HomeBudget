function moveList(globalVar, listId, boardId) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/idBoard?value=' + boardId + '&' + globalVar.keyAndToken, data)
}