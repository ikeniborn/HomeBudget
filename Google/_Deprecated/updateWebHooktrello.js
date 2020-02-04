function updateWebHooktrello() {
  var enableStackdriverLogging = true
  try {
    var apiToken = getTokenTrello()
    var apiKey = getTrelloApiKey()
    var keyAndToken = 'key=' + apiKey + '&token=' + apiToken

    var response = UrlFetchApp.fetch('https://api.trello.com/1/webhooks/' + trelloWebHookId + '?' + keyAndToken);
    var responseData = JSON.parse((response.getContentText()))
    var trelloWebHookId = responseData.id
    Console.log(responseData)
  } catch (e) {
    if (enableStackdriverLogging) console.error('ERROR: ' + e)

  } finally {
    if (enableStackdriverLogging) console.log('idWebHook: ' + trelloWebHookId)
  }
}