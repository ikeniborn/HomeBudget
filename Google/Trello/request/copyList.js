function copyList(globalVar, listName, boardId, idListSource) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'lists/?name=' + listName + '&idBoard=' + boardId + '&idListSource=' + idListSource + '&pos=bottom&' + globalVar.keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}