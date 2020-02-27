function addBoardLabel(postObject, labelName, labelColor, boardId) {
  /*
   * @postObject - входные параметра запроса
   * @labelName - входной параметр имени метки
   * @labelColor - входной параметр цвета метки
   * @boardId - входной параметр ID доски trello
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'labels?name=' + labelName + '&color=' + labelColor + '&idBoard=' + boardId + '&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('addCheckList: ' + e)
  }
}