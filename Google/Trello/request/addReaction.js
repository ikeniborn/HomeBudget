// добавление реакции в трелло
function addReaction(globalVar, actionId, reaction) {
  var payload = JSON.stringify(reaction)
  var data = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'actions/' + actionId + '/reactions?' + globalVar.keyAndToken, data)
}