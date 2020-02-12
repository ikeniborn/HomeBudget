function copyCard(globalVar, listId, idCardSource) {
  var data = {
    method: 'post',
    contentType: 'application/json'
  }
  var resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?pos=bottom&idList=' + listId + '&idCardSource=' + idCardSource + '&keepFromSource=attachments,checklists,due,members,stickers&' + globalVar.keyAndToken, data)
  var variable = {}
  variable.id = JSON.parse(resp).id
  variable.name = JSON.parse(resp).name
  return variable
}