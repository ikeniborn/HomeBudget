function updateCard(postObject) {
  /*
   * @postObject - входные параметра запроса
   */
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '?desc=' + postObject.cardComment + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('updateCard: ' + e)
  }
}