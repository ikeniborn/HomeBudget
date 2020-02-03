function closedList(listId) {
  var data = {
    method: 'put',
    contentType: 'application/json'
  }
  UrlFetchApp.fetch(apiRoot + 'lists/' + listId + '/closed?value=true&' + keyAndToken, data)
}