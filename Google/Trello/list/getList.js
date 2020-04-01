function getList(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @boardId - входной параметр ID доски trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'boards/' + postObject.boardId + '/lists?cards=none&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var listArray = {}
    respData.reduce(function (variable, array) {
      var listName = array.name
      var postObjectCfo = postObject.cfo
      if (listName.toLowerCase().match(postObjectCfo.toLowerCase())) {
        variable = {}
        variable.id = array.id
        variable.name = array.name
        listArray = variable
      }
    }, {})
    return listArray
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}