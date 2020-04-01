function closeCard(postObject, cardId) {
  /*
   * @postObject - входные параметра запроса
   * @cardId - входной параметр ID карточки trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + '/cards/' + cardId + '?closed=true&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}