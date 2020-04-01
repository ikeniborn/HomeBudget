function getCheckList(postObject, cardId) {
  /*
   * @postObject - входные параметра запроса
   * @cardId - входной параметр ID карточки trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + cardId + '/checklists?checkItems=all&checkItem_fields=all&filter=all&fields=all&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var variable = respData.reduce(function (row, array) {
      if (array.name.match('Бюджет')) {
        row = {}
        row.id = array.id
        row.name = array.id
        row.checkItems = array.checkItems
      }
      return row
    })
    return variable
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}