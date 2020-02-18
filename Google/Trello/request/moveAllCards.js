function moveAllCards(globalVar, oldListId, newBoardId, newListId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + newBoardId + '&idList=' + newListId + '&' + globalVar.keyAndToken, data)
}