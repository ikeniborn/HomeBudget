function updateCard(globalVar, postObject) {
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + postObject.cardId + '?desc=' + postObject.cardComment + '&' + globalVar.keyAndToken, data)
  } catch (e) {
    console.error('updateCard: ' + e)
  } finally {
    console.log('updateCard: complete')
  }
}