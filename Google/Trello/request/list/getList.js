function getList(postObject, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @boardId - входной параметр ID доски trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'boards/' + boardId + '/lists?cards=none&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var listArray = {}
    respData.reduce(function (variable, array) {
      if (parseListName(array.name) == postObject.listName) {
        variable = {}
        variable.id = array.id
        variable.name = array.name
        listArray = variable
      }
    }, {})
    return listArray
  } catch (e) {
    console.error('getList: ' + e)
  }
}