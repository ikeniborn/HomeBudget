function updateCardDesc(postObject) {
  /*
   * @postObject - входные параметра запроса
   */
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '?desc=' + postObject.cardDesc + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('updateCardDesc: ' + e)
  }
}