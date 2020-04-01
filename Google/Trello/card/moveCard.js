function moveCard(postObject) {
  /*
   * @postObject - входные параметра запроса
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/idBoard?value=' + postObject.boardId + '&idList=' + postObject.listId + '&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}