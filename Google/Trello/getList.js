function getList(boardId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/lists?cards=none&' + keyAndToken, data)
  var respData = JSON.parse(resp)
  var listArray = []
  respData.reduce(function (variable, array) {
    variable = {}
    variable.id = array.id
    variable.name = array.name
    return listArray.push(variable)
  }, {})
  return listArray
}