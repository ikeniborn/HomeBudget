function archiveAllCards(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр идентификатора листа trello
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + postObject.listId + '/archiveAllCards?' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}