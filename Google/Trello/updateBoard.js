function updateBoard(boardId, boardName) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '?name=' + boardName + '&' + keyAndToken, data)
}