function addCheckListItem(postObject, checkListId, nameItem) {
  /*
   * @postObject - входные параметра запроса
   * @checkListId - входной параметр ID чеклиста
   * @nameItem - входной параметр ID пункта чеклиста
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'checklists/' + checkListId + '/checkItems?name=' + nameItem + '&pos=bottom&checked=false&' + postObject.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('addCheckListItem: ' + e)
  }
}