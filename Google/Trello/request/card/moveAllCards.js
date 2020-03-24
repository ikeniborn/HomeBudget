function moveAllCards(postObjectOld, postObjectNew) {
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
    UrlFetchApp.fetch(postObjectOld.apiRoot + 'lists/' + postObjectOld.ListId + '/moveAllCards?idBoard=' + postObjectNew.BoardId + '&idList=' + postObjectNew.ListId + '&' + postObjectOld.keyAndToken, data)
  } catch (e) {
    console.error('moveAllCards: ' + e)
  }
}