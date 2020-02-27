function archiveAllCards(postObject, listId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр идентификатора листа trello
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/archiveAllCards?' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('archiveAllCards: ' + e)
  }
}