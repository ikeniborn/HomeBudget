function moveAllCards(postObject, oldListId, newBoardId, newListId) {
  /*
   * @postObject - входные параметра запроса
   * @oldListId - входной параметр ID старой карточки trello
   * @newBoardId - входной параметр ID новой доски trello
   * @newListId - входной параметр ID нового листа trello
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + oldListId + '/moveAllCards?idBoard=' + newBoardId + '&idList=' + newListId + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('moveAllCards: ' + e)
  }
}