function getCheckList(globalVar, cardId) {
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(globalVar.apiRoot + 'cards/' + cardId + '/checklists?checkItems=all&checkItem_fields=all&filter=all&fields=all&' + globalVar.keyAndToken, data)
    var respData = JSON.parse(resp)
    var variable = respData.reduce(function (row, array) {
      if (array.name.match('Бюджет')) {
        row = {}
        row.id = array.id
        row.name = array.id
        row.checkItems = array.checkItems
      }
      return row
    })
    return variable
  } catch (e) {
    console.error('getCheckList: ' + e)
  } finally {
    console.log('getCheckList: complete')
  }
}