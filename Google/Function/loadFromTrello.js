function loadFromTrello(apiKey, apiToken, apiRoot, boardId, sheetID, sheetName) {
  // trello variables
  var logingName = 'ilyatischenko'
  var enableStackdriverLogging = true
  try {
    if (enableStackdriverLogging) console.time(logingName + ' - loadTrello')
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello STARTED')

    var keyAndToken = 'key=' + apiKey + '&token=' + apiToken

    // get last date from source array
    var maxDate = getLastDateArray(sheetID, sheetName)

    var response = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/actions/?limit=30&' + keyAndToken)
    var actions = JSON.parse((response.getContentText()))
    var lastData = []
    for (i = 0; i < actions.length; i++) {
      var action = actions[i]
      if (new Date(action.date) > new Date(maxDate.getTime()) && action.type == 'commentCard') {
        var commentDate = new Date(action.date)
        var userName = action.memberCreator.username
        var listName = action.data.list.name
        var nomenclatureName = action.data.card.name
        var rowDataText = action.data.text
        var sumData = rowDataText.match(/^\d+/)
        var commentData = rowDataText.split(sumData).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
        lastData.push([commentDate, userName, listName, nomenclatureName, +sumData, commentData])
      }
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + ' ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello ENDED')
    if (enableStackdriverLogging) console.timeEnd(logingName + ' - loadTrello')
  }
  return lastData
}