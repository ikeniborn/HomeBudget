function copyCard(postObject, listId, idCardSource) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   * @idCardSource - входной параметр ID карточки - исходника trello
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + '/cards?pos=bottom&idList=' + listId + '&idCardSource=' + idCardSource + '&keepFromSource=attachments,checklists,due,members,stickers&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('closedList: ' + e)
  }
}