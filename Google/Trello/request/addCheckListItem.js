function addCheckListItem(checkListId, nameItem) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(apiRoot + 'checklists/' + checkListId + '/checkItems?name=' + nameItem + '&pos=bottom&checked=false&' + keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}