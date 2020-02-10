function getCardList(globalVar, cardId) {
  var data = {
    method: 'get',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/list?&' + globalVar.keyAndToken, data)
  var respData = JSON.parse(resp)
  var variable = {}
  variable.id = respData.id
  variable.name = parseListName(respData.name)
  return variable
}