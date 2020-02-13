function getBoardLabel(globalVar, boardId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'boards/' + boardId + '/labels?fields=all&limit=10&' + globalVar.keyAndToken, data)
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
}