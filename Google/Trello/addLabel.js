function addLabel(labelName, labelColor, boardId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(apiRoot + 'labels?name=' + labelName + '&color=' + labelColor + '&idBoard=' + boardId + '&' + keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}