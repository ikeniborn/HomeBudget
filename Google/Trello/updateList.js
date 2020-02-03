function updateList(listId, listName) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'lists/' + listId + '?name=' + listName + '&' + keyAndToken, data)
}