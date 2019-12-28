// trello variables
var apiKey = '9dae7dd3ce328d61e67edb4557149502'
var apiToken = getTokenTrello()
var apiRoot = 'https://api.trello.com/1/'
// var api_member= 'ilyatischenko'
var boardId = '5dfa7488d7059121c66b4b57' // https://trello.com/b/fXSbKPpT/api
var googleId = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
var sheetName = 'Trello'
var enableStackdriverLogging = true
var logingName = 'ilyatischenko'
var dateFilter = startDate(1)

function stringComparison(s1, s2) {
  // lets test both variables are the same object type if not throw an error
  if (Object.prototype.toString.call(s1) == Object.prototype.toString.call(s2)) {
    var duplicate = true
  }
};

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
    for (var j = 0; j < ssArray.length; j++) {
      arrayDate.push(ssArray[j][0]);
    };
    var maxDate = arrayDate.reduce(function (a, b) {
      return a > b ? a : b;
    });

    //    ss.appendRow(['Date', 'Task', 'Sum', 'Desc', 'Who', 'List'])
    //    ss.getRange(1, 1, 1, 6).setFontWeight('Bold')

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
        //        var response = UrlFetchApp.fetch(apiRoot + "cards/" + card.id + "/?actions=all&" + keyAndToken);
        //        var carddetails = JSON.parse(response.getContentText()).actions;
        var response = UrlFetchApp.fetch(apiRoot + 'cards/' + card.id + '/?actions=commentCard&' + keyAndToken)
        var carddetails = JSON.parse(response.getContentText()).actions
        //        var strComment = carddetails[0].data.text
        //        var sumComment = [];
        //        sumComment.push(strComment.split('.'));
        //        Logger.log(+sumComment[0][0]);
        if (!carddetails) continue

        var lastDay = carddetails.filter(function (row) {
          return new Date(row.date) >= dateFilter
        })

        for (var k = 0; k < lastDay.length; k++) {
          // Get the rest of the card data
          if (new Date(carddetails[k].date) > new Date(maxDate.getTime())) {
            var date = new Date(carddetails[k].date)
            var fullName = carddetails[k].memberCreator.fullName
            var cardName = card.name
            var listName = list.name
            // split data to sum and desc
            var comment = carddetails[k].data.text
            //            var sumComment = comment.split(/[., ,\-,\/,\\]/)
            //            
            if (comment.match(/^[с,c]/)) {
              var vcfo = 'Семья'
              var data = comment.split(/^[с,c]/).join(' ').trim()
              var sumdata = data.match(/^\d+/)
              var desc = data.split(sumdata).join(' ').trim()
              Logger.log(desc)
            }
            //            var sumComment = comment.match(/^\d+/)
            //            var desc = comment.split(sumComment)

            //            for (var t = 1; t < sumComment.length; t++) {
            //              desc.push(sumComment[t])
            //            }
            ss.appendRow([date, cardName, +sumdata, desc, fullName, listName, vcfo])
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