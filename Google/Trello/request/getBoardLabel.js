function getBoardLabel(globalVar, boardId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'boards/' + boardId + '/labels?fields=all&limit=10&' + globalVar.keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  variable.color = JSON.parse(resp).name
  return variable
}