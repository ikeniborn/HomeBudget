function getCardLabel(postObject) {
  /*
   * @postObject - входные параметра запроса
   **/
  try {
    var data = {
      method: 'get',
      contentType: 'application/json'
    }
    var resp = UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/labels?' + postObject.keyAndToken, data)
    var respData = JSON.parse(resp)
    var variable = {}
    variable.item = {}
    variable.array = []
    respData.reduce(function (row, array, index) {
      if (index == 0) {
        row = {}
        row.id = array.id
        row.name = array.name
        row.color = array.color
        variable.item = row
        variable.array.push(row)
      } else {
        row = {}
        row.id = array.id
        row.name = array.name
        row.color = array.color
        variable.array.push(row)
      }
    }, {})
    return variable
  } catch (e) {
    console.error('getCardLabel: ' + e)
  }
}