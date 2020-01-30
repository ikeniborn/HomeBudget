function addReaction(apiRoot, apiToken, apiKey, actionId) {
  var keyAndToken = 'key=' + apiKey + '&token=' + apiToken
  var payload = "{\"shortName\":\"raised_hands\",\"native\":\"✅\",\"unified\":\"2705\"}";
  var data = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  }
  UrlFetchApp.fetch(apiRoot + 'actions/' + actionId + '/reactions?' + keyAndToken, data)
}