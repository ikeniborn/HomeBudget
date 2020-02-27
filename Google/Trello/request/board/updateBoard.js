function updateBoard(postObject, boardId, boardName) {
  /*
   * @postObject - входные параметра запроса
   * @boardName - входной параметр наименования доски trello
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'boards/' + boardId + '?name=' + boardName + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('updateBoard: ' + e)
  }
}