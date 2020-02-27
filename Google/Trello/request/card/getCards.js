function getCards(postObject, listId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/cards?' + postObject.keyAndToken, data)
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
  } catch (e) {
    console.error('getCards: ' + e)
  }
}