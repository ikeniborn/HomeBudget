function loadFromTrello(apiKey, apiToken, apiRoot, boardId, googleId, sheetName) {
  // trello variables
  var logingName = 'ilyatischenko'
  var enableStackdriverLogging = true
  try {
    if (enableStackdriverLogging) console.time(logingName + ' - loadTrello')
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello STARTED')

    var keyAndToken = 'key=' + apiKey + '&token=' + apiToken
    var cr = 2

    // get last date from save array
    var maxDate = getLastDateSaveArray(googleId, sheetName)

    // Get last comment for check update data
    var response = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/actions/?limit=30&' + keyAndToken)
    var actions = JSON.parse((response.getContentText()))
    var lastCommentDate = []
    for (var i = 0; actions.length; i++) {
      var action = actions[i]
      if (action.type == 'commentCard') {
        lastCommentDate.push(new Date(action.date))
        break
      }
    }

    if (new Date(lastCommentDate) > new Date(maxDate.getTime())) {
      // Get all lists from Trello API
      var responseList = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/lists?cards=all&' + keyAndToken)
      var lists = JSON.parse((responseList.getContentText()))
      // for all lists
      for (var i = 0; i < lists.length; i++) {
        var list = lists[i]
        // Get all cards from Trello API
        var responseCard = UrlFetchApp.fetch(apiRoot + 'list/' + list.id + '/cards?' + keyAndToken)
        var cards = JSON.parse(responseCard.getContentText())
        if (!cards) continue

        // for all cards
        for (var j = 0; j < cards.length; j++) {
          var card = cards[j]
          // Get all details of card from Trello API
          var responseCommentCard = UrlFetchApp.fetch(apiRoot + 'cards/' + card.id + '/?actions=commentCard&' + keyAndToken)
          var commentCards = JSON.parse(responseCommentCard.getContentText()).actions
          if (!commentCards) continue

          var lastData = commentCards.map(function (row) {
            if (new Date(row.date) >= new Date(maxDate.getTime())) {
              var commentDate = new Date(row.date)
              var userName = row.memberCreator.username
              var listName = list.name
              var nomenclatureName = card.name
              var sumData = row.match(/^\d+/)
              var comment = row.data.text.split(sumData).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
              return [commentDate, userName, listName, nomenclatureName, +sumData, comment]
            }
          })
          cr++
        }
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