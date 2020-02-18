function updateBoard(globalVar, boardId, boardName) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'boards/' + boardId + '?name=' + boardName + '&' + globalVar.keyAndToken, data)
}