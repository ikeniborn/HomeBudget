function moveList(listId, boardId) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'lists/' + listId + '/idBoard?value=' + boardId + '&' + keyAndToken, data)
}