function addCard(globalVar, cardName, listId, labelId) {
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    var resp
    if (labelId == undefined) {
      resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&' + globalVar.keyAndToken, data)
    } else {
      resp = UrlFetchApp.fetch(globalVar.apiRoot + '/cards?name=' + cardName + '&idList=' + listId + '&idLabels=' + labelId + '&' + globalVar.keyAndToken, data)
    }
    var variable = {}
    variable.id = JSON.parse(resp).id
    variable.name = JSON.parse(resp).name
    return variable
  } catch (e) {
    console.error('addCard: ' + e)
  } finally {
    console.log('addCard: complete')
  }
}