function moveAllCards(globalVar, oldListId, boardId, newListId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + boardId + '&idList=' + newListId + '&' + globalVar.keyAndToken, data)
}