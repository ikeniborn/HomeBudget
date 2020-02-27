function addCheckList(postObject, cardId, checkListName) {
  /*
   * @postObject - входные параметра запроса
   * @cardId - входной параметр ID карточки trello
   * @checkListName - входной парамтер наименования чеклиста trello
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + cardId + '/checklists?name=' + checkListName + '&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('addCheckList: ' + e)
  }
}