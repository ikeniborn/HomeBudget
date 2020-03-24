function getCards(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + postObject.listId + '/cards?' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var cards = {}
    cards.item = {}
    cards.array = []
    respData.reduce(function (variable, array) {
      if (array.name == postObject.nomenclature) {
        variable = {}
        variable.id = array.id
        variable.name = array.name
        cards.item = variable
        cards.array.push(variable)
      } else {
        variable = {}
        variable.id = array.id
        variable.name = array.name
        cards.array.push(variable)
      }
    }, {})
    return cards
  } catch (e) {
    console.error('getCards: ' + e)
  }
}