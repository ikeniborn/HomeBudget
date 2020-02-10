function moveCard(globalVar, cardId, listId, boardId) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '?idList=' + listId + '&idBoard=' + boardId + '&' + globalVar.keyAndToken, data)
}