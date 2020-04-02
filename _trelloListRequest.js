function addList(postObject, listName, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @labelName - входной параметр имени метки
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'lists/?name=' + listName + '&idBoard=' + boardId + '&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}

function closedList(postObject, listId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/closed?value=true&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}

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
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}

function getList(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @boardId - входной параметр ID доски trello
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'boards/' + postObject.boardId + '/lists?cards=none&' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var listArray = {}
    respData.reduce(function (variable, array) {
      var listName = array.name
      var postObjectCfo = postObject.cfo
      if (listName.toLowerCase().match(postObjectCfo.toLowerCase())) {
        variable = {}
        variable.id = array.id
        variable.name = array.name
        listArray = variable
      }
    }, {})
    return listArray
  } catch (e) {
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}

function moveList(postObject, listId, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @listId - входной параметр ID листа trello
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + listId + '/idBoard?value=' + boardId + '&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}

function updateList(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @listName - входной параметр ID листа trello
   * @listName - входной параметр нового имени листа trello
   **/
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'lists/' + postObject.listId + '?name=' + postObject.listName + '&' + postObject.keyAndToken, data)
  } catch (e) {
    postObject.error += arguments.callee.name + ': ' + e + postObject.lineBreakCell
    addError(postObject)
  }
}