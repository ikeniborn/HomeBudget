function updateBoard(boardId, boardName) {
  var globalVar = getVariable()
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'boards/' + boardId + '?name=' + boardName + '&' + globalVar.keyAndToken, data)
}