function getCardList(postObject, cardId) {
  /*
   * @postObject - входные параметра запроса
   * @cardId - входной параметр ID карточки trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + cardId + '/list?&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var variable = {}
    variable.id = respData.id
    variable.name = parseListName(respData.name)
    return variable
  } catch (e) {
    console.error('getCardList: ' + e)
  }
}