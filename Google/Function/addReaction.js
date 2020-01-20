function addActionTrello() {
  var logingName = 'ilyatischenko'
  var enableStackdriverLogging = true
  try {
    var apiKey = '9dae7dd3ce328d61e67edb4557149502'
    var apiToken = getTokenTrello() // get token for session
    var apiRoot = 'https://api.trello.com/1/'
    var boardId = '5e05161dc3abef51fcf4e761'
    var actionId = '5e24a6556484178b22d35a30'
    var keyAndToken = 'key=' + apiKey + '&token=' + apiToken

    var payload = "{\"shortName\":\"raised_hands\",\"native\":\"✅\",\"unified\":\"2705\"}";

    var data = {
      "method": "post",
      'contentType': 'application/json',
      "payload": payload
    }

    //    var response = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/actions/?limit=1&' + keyAndToken)
    var response = UrlFetchApp.fetch(apiRoot + 'actions/' + actionId + '/reactions?' + keyAndToken, data)
    //    var actions = JSON.parse((response.getContentText()))
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + ' ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello ENDED')
    if (enableStackdriverLogging) console.timeEnd(logingName + ' - loadTrello')
  }
}