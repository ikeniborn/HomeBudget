function closedList(postObject, listId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/closed?value=true&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('closedList: ' + e)
  }
}