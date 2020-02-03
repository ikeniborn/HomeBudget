function addCard(cardName, listId, arrayLabelId) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp
  if (arrayLabelId == undefined) {
    resp = UrlFetchApp.fetch(apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&' + keyAndToken, data)
  } else {
    var allLabelId
    if (arrayLabelId.length > 1) {
      allLabelId = arrayLabelId.join(',')
    } else {
      allLabelId = arrayLabelId
    }
    resp = UrlFetchApp.fetch(apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&idLabels=' + allLabelId + '&' + keyAndToken, data)
  }
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}