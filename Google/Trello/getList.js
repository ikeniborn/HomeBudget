function getList(boardId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/lists?cards=none&' + keyAndToken, data)
  var respData = JSON.parse(resp)
  var listArray = []
  var list
  respData.reduce(function (variable, array) {
    variable = {}
    variable.id = array.id
    variable.name = array.name
    return listArray.push(variable)
  }, {})
  if (listArray.length == 1) {
    list = listArray[0]
    return list
  }
  return listArray
}