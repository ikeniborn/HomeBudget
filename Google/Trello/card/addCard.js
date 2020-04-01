function addCard(postObject, cardName, listId, pos, labelId) {
  /*
   * @postObject - входные параметра запроса
   * @cardName - входной параметр наименования карточки trello
   * @listId - входной параметр ID листа trello
   * @labelId - входной параметр ID метки trello
   * @pos - позиция карточки на листе
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp
    var position
    pos == undefined ? position = 'bottom' : position = pos
    if (labelId == undefined) {
      resp = UrlFetchApp.fetch(postObject.apiRoot + '/cards?pos=' + position + '&name=' + cardName + '&idList=' + listId + '&' + postObject.keyAndToken, data)
    } else {
      resp = UrlFetchApp.fetch(postObject.apiRoot + '/cards?pos=' + position + '&name=' + cardName + '&idList=' + listId + '&idLabels=' + labelId + '&' + postObject.keyAndToken, data)
    }
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}