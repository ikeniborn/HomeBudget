function getCards(globalVar, listId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '/cards?' + globalVar.keyAndToken, data)
  var respData = JSON.parse(resp)
  var cardArray = []
  // var card = {}
  respData.reduce(function (variable, array) {
    variable = {}
    variable.id = array.id
    variable.name = array.name
    return cardArray.push(variable)
  }, {})
  return cardArray
}