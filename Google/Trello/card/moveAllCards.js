function moveAllCards(postObjectOld, postObjectNew) {
  /*
   * @postObjectOld
   * @postObjectNew
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObjectOld.apiRoot + 'lists/' + postObjectOld.listId + '/moveAllCards?idBoard=' + postObjectNew.boardId + '&idList=' + postObjectNew.listId + '&' + postObjectOld.keyAndToken, data)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}