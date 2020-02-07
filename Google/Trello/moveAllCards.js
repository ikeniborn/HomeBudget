function moveAllCards(oldListId, boardId, newListId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + boardId + '&idList=' + newListId + '&' + keyAndToken, data)
}