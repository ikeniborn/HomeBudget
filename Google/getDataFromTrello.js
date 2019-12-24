// trello variables
var api_key = "9dae7dd3ce328d61e67edb4557149502";
var api_token = "e47e9f1e751ede79d8357bee26cbf3bd9d1958481b6d05a241f8687afc63f4cf";
var api_root = 'https://api.trello.com/1/'
//var api_member= 'ilyatischenko'
var board_id = "5dfa7488d7059121c66b4b57"; //https://trello.com/b/fXSbKPpT/api
var googleId = "10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E"
var sheetName = "Trello"
var enableStackdriverLogging = true;
var logingName = "ilyatischenko";

function stringComparison(s1, s2) {
  // lets test both variables are the same object type if not throw an error
  if (Object.prototype.toString.call(s1) == Object.prototype.toString.call(s2)) {
    duplicate = true;
  }
};

function loadFromTrello() {
  try {
    if (enableStackdriverLogging) console.time(logingName + " - loadTrello");
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello STARTED");

    var url = "https://api.trello.com/1/";
    var key_and_token = "key=" + api_key + "&token=" + api_token;
    var cr = 2;

    // get sheet with name Trello, clear all contents, add titles
    var ss = SpreadsheetApp.openById(googleId).getSheetByName(sheetName).clear();
    ss.appendRow(["listID", "CardID", "Date", "Task", "Sum", "Desc", "Who", "List"]);
    ss.getRange(1, 1, 1, 11).setFontWeight("Bold");
    // var sourceArray = ss.getDataRange().getValues();

    //Get all lists from Trello API
    var response = UrlFetchApp.fetch(url + "boards/" + board_id + "/lists?cards=all&" + key_and_token);
    var lists = JSON.parse((response.getContentText()));
    // for all lists 
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i];
      // Get all cards from Trello API
      var listId = list.id
      var response = UrlFetchApp.fetch(url + "list/" + list.id + "/cards?" + key_and_token);
      var cards = JSON.parse(response.getContentText());
      if (!cards) continue;

      // for all cards
      for (var j = 0; j < cards.length; j++) {
        var card = cards[j];
        //Get all details of card from Trello API
        var cardId = card.id;
        //        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/?actions=all&" + key_and_token);
        //        var carddetails = JSON.parse(response.getContentText()).actions;

        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/?actions=commentCard&" + key_and_token);
        var carddetails = JSON.parse(response.getContentText()).actions;
        //        var strComment = carddetails[0].data.text
        //        var sumComment = [];
        //        sumComment.push(strComment.split('.'));
        //        Logger.log(+sumComment[0][0]);
        if (!carddetails) continue;

        for (var k = 0; k < carddetails.length; k++) {
          // Get the rest of the card data
          var dato = carddetails[k].date;
          var fullname = carddetails[k].memberCreator.fullName;
          var cardname = card.name;
          var listname = list.name;
          //split data to sum and desc
          var comment = carddetails[k].data.text
          var sumComment = comment.split(/[., ,\-,\/]/)
          var desc =[]
          for (t=1; t<sumComment.length;t++){
            desc.push(sumComment[t])
          }
          ss.appendRow([listId, cardId, dato, cardname, +sumComment[0], desc.join(' '), fullname, listname]);
          cr++;
        }

      }
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);
  } finally {
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - loadTrello");
  }
}