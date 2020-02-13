function addCard(globalVar, cardName, listId, labelId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&idLabels=' + labelId + '&' + globalVar.keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}