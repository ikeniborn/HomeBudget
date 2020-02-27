function copyList(postObject, listName, boardId, idListSource) {
  /*
   * @postObject - входные параметра запроса
   * @listName - входной параметр ID листа trello
   * @boardId - входной параметр ID доски.Изменяем trello
   * @idListSource - входной параметр ID листа - исходника trello
   **/
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'lists/?name=' + listName + '&idBoard=' + boardId + '&idListSource=' + idListSource + '&pos=bottom&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('closedList: ' + e)
  }
}