function getCard(listId) {
  var globalVar = getVariable()
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/cards?' + globalVar.keyAndToken, data)
  var respData = JSON.parse(resp)
  var cardArray = []
  var card = {}
  respData.reduce(function (variable, array) {
    variable = {}
    variable.id = array.id
    variable.name = array.name
    return cardArray.push(variable)
  }, {})
  if (cardArray.length == 1) {
    card = cardArray[0]
    return card
  } else {
    return cardArray
  }
}