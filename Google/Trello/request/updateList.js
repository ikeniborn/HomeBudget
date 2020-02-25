function updateList(globalVar, listId, listName) {
  try {
    var data = {
      method: 'put',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(globalVar.apiRoot + 'lists/' + listId + '?name=' + listName + '&' + globalVar.keyAndToken, data)
  } catch (e) {
    console.error('updateList: ' + e)
  } finally {
    console.log('updateList: complete')
  }
}