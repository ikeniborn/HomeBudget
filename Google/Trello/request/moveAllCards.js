function moveAllCards(oldListId, boardId, newListId) {
  var globalVar = getVariable()
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + boardId + '&idList=' + newListId + '&' + globalVar.keyAndToken, data)
}