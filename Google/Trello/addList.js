function addList(listName, boardId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(apiRoot + 'lists/?name=' + listName + '&idBoard=' + boardId + '&' + keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}