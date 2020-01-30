// добавление реакции в трелло
function addReaction(apiRoot, apiToken, apiKey, actionId, reaction) {
  var keyAndToken = 'key=' + apiKey + '&token=' + apiToken
  var payload = JSON.stringify(reaction)
  var data = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  }
  UrlFetchApp.fetch(apiRoot + 'actions/' + actionId + '/reactions?' + keyAndToken, data)
}