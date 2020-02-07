function addCard(cardName, listId, arrayLabelId) {
  var globalVar = getVariable()
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp
  if (arrayLabelId == undefined) {
    resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&' + globalVar.keyAndToken, data)
  } else {
    var allLabelId
    if (arrayLabelId.length > 1) {
      allLabelId = arrayLabelId.join(',')
    } else {
      allLabelId = arrayLabelId
    }
    resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&idLabels=' + allLabelId + '&' + globalVar.keyAndToken, data)
  }
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}