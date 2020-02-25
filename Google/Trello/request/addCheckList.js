function addCheckList(globalVar, cardId, checkListName) {
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/checklists?name=' + checkListName + '&' + globalVar.keyAndToken, data)
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('addCheckList: ' + e)
  } finally {
    console.log('addCheckList: complete')
  }
}