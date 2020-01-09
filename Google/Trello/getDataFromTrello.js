// trello variables
var apiKey = '9dae7dd3ce328d61e67edb4557149502'
var apiToken = getTokenTrello()
var apiRoot = 'https://api.trello.com/1/'
var boardId = '5e05161dc3abef51fcf4e761' // https://trello.com/b/fXSbKPpT/api
var googleId = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
var sheetName = 'Trello'
var enableStackdriverLogging = true
var logingName = 'ilyatischenko'
var factPeriodNow = getMetadata(googleId, 'Период')[0][0]
var factPeriodPrev = getMetadata(googleId, 'Период')[1][0]
var dirItem = getDirItem(); //получение справочника статей

function loadFromTrello() {
  try {
    if (enableStackdriverLogging) console.time(logingName + ' - loadTrello')
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello STARTED')

    var keyAndToken = 'key=' + apiKey + '&token=' + apiToken
    var cr = 2

    // get sheet with name Trello, clear all contents, add titles
    var ss = SpreadsheetApp.openById(googleId).getSheetByName(sheetName)
    var ssArray = ss.getDataRange().getValues()
    var arrayDate = [];
    for (var j = 1; j < ssArray.length; j++) {
      arrayDate.push(ssArray[j][0]);
    };

    var maxDate = arrayDate.reduce(function (a, b) {
      return a > b ? a : b;
    }, startDate(1));

    // Get all lists from Trello API
    var response = UrlFetchApp.fetch(apiRoot + 'boards/' + boardId + '/lists?cards=all&' + keyAndToken)
    var lists = JSON.parse((response.getContentText()))
    // for all lists 
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i]
      // Get all cards from Trello API
      var listId = list.id
      var response = UrlFetchApp.fetch(apiRoot + 'list/' + list.id + '/cards?' + keyAndToken)
      var cards = JSON.parse(response.getContentText())
      if (!cards) continue

      // for all cards
      for (var j = 0; j < cards.length; j++) {
        var card = cards[j]
        // Get all details of card from Trello API
        var cardId = card.id
        var response = UrlFetchApp.fetch(apiRoot + 'cards/' + card.id + '/?actions=commentCard&' + keyAndToken)
        var carddetails = JSON.parse(response.getContentText()).actions
        if (!carddetails) continue

        var lastDay = carddetails.filter(function (row) {
          return new Date(row.date) >= maxDate
        })

        for (var k = 0; k < lastDay.length; k++) {
          // Get the rest of the card data
          if (new Date(carddetails[k].date) > new Date(maxDate.getTime())) {

            var date = new Date(carddetails[k].date)
            var fullName = carddetails[k].memberCreator.username
            if (!factPeriodPrev) {
              var factPeriod = factPeriodNow
            } else {
              if (fullName == 'ilyatischenko') {
                var factPeriod = factPeriodNow
              } else if (fullName == 'oksanatischenko') {
                var factPeriod = factPeriodPrev
              }
            }
            var listName = list.name
            var nomecName = card.name
            var dataDirItem = dirItem.filter(function (row) {
              return row[0] == nomecName
            })
            var insertType = dataDirItem[0][2];
            var insertItem = dataDirItem[0][1];
            // split data to sum and desc
            var comment = carddetails[k].data.text
            var sumData = comment.match(/^\d+/)
            var desc = comment.split(sumData).join(' ').trim()
            for (var l = 0; l < card.labels.length; l++) {
              var labels = card.labels[l].name
            }
            if (labels.length > 1) {
              var typeCost = insertType
            } else {
              var typeCost = labels
            }
            ss.appendRow([date, factPeriod, listName, listName, typeCost, insertItem, nomecName, +sumData, desc])
          }

          cr++

        }

      }
    }
    //Удаление пустых строк
    var maxRows = ss.getMaxRows();
    var lastRow = ss.getLastRow();
    if (maxRows - lastRow != 0) {
      ss.deleteRows(lastRow + 1, maxRows - lastRow);
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + ' ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello ENDED')
    if (enableStackdriverLogging) console.timeEnd(logingName + ' - loadTrello')
  }
}