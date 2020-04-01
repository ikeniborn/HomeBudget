function updateList(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @listName - входной параметр ID листа trello
   * @listName - входной параметр нового имени листа trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + postObject.listId + '?name=' + postObject.listName + '&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}