function addList(postObject, listName, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @labelName - входной параметр имени метки
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'lists/?name=' + listName + '&idBoard=' + boardId + '&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}