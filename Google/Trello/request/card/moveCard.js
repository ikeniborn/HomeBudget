function moveCard(postObject, cardId, listId, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @cardId - входной параметр ID карточки trello
   * @listId - входной параметр ID нового листа trello
   * @boardId - входной параметр ID новой доски trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + cardId + '/idBoard?value=' + boardId + '&idList=' + listId + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('moveCard: ' + e)
  }
}