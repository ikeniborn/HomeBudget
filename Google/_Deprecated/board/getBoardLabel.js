function getBoardLabel(postObject, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @boardId - входной параметр ID листа trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'boards/' + boardId + '/labels?fields=all&limit=10&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var respArray = []
    respData.reduce(function (variable, array) {
      variable = {}
      variable.id = array.id
      variable.name = array.name
      variable.color = array.color
      return respArray.push(variable)
    }, {})
    return respArray
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}