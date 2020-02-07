// добавление реакции в трелло
function addReaction(actionId, reaction) {
  var globalVar = getVariable()
  var payload = JSON.stringify(reaction)
  var data = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  }
  UrlFetchApp.fetch(globalVar.apiRoot + 'actions/' + actionId + '/reactions?' + globalVar.keyAndToken, data)
}