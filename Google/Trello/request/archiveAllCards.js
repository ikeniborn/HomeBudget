function archiveAllCards(globalVar, listId) {
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/archiveAllCards?' + globalVar.keyAndToken, data)
  } catch (e) {
    console.error('archiveAllCards: ' + e)
  } finally {
    console.log('archiveAllCards: complete')
  }
}