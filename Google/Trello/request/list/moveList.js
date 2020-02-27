function moveList(postObject, listId, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/idBoard?value=' + boardId + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('moveList: ' + e)
  }
}