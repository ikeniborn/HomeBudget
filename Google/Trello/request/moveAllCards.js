function moveAllCards(globalVar, oldListId, newBoardId, newListId) {
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + newBoardId + '&idList=' + newListId + '&' + globalVar.keyAndToken, data)
  } catch (e) {
    console.error('moveAllCards: ' + e)
  } finally {
    console.log('moveAllCards: complete')
  }
}