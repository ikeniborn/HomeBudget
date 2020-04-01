function getCardList(postObject) {
  /*
   * @postObject - входные параметра запроса
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/list?&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var variable = {}
    variable.id = respData.id
    variable.name = respData.name
    return variable
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}