// trello variables
var api_key = "9dae7dd3ce328d61e67edb4557149502";
var api_token = "e47e9f1e751ede79d8357bee26cbf3bd9d1958481b6d05a241f8687afc63f4cf";
var api_root = 'https://api.trello.com/1/'
//var api_member= 'ilyatischenko'
var board_id = "56723b65667ed4bd33e1f156"; //https://trello.com/b/fXSbKPpT/api
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
    ss.appendRow(["listID", "CardID", "Date", "Task", "Desc", "Who", "List", "Link", "Labels", "Label Colors", "Checklists", "Due Date", "Due Complete"]);
    ss.getRange(1, 1, 1, 11).setFontWeight("Bold");
    var sourceArray = ss.getDataRange().getValues();

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
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/?actions=all&" + key_and_token);
        var carddetails = JSON.parse(response.getContentText()).actions;
        if (!carddetails) continue;

        //Get all checklists of card from Trello API
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/checklists?action=all&" + key_and_token);
        var cardchecklists = JSON.parse(response.getContentText());

        var checkliststr = "";
        // For all checklists get Name
        for (var m = 0; m < cardchecklists.length; m++) {
          checkliststr = checkliststr + (checkliststr == "" ? "" : "\n\n") + cardchecklists[m].name + "\n --------- \n";
          // For all checklists get Items
          for (var n = 0; n < cardchecklists[m].checkItems.length; n++) {
            checkliststr = checkliststr + (checkliststr == "" ? "" : "\n") + (cardchecklists[m].checkItems[n].state == 'complete' ? "[x] " : "[ ] ") + cardchecklists[m].checkItems[n].name;
          }
        }
        for (var k = 0; k < carddetails.length; k++) {
          // Get the rest of the card data
          var dato = carddetails[k].date;
          var fullname = carddetails[k].memberCreator.fullName;
          var name = card.name;
          var link = card.shortUrl;
          var listname = list.name;
          var desc = card.desc;
          var duedate = card.due;
          var duecomplete = (card.dueComplete == true ? 'YES' : 'NO');
          var labels = "";
          var labelsColors = "";
          for (var l = 0; l < card.labels.length; l++) {
            labels = labels + (labels == "" ? "" : "\n") + card.labels[l].name;
            labelsColors = labelsColors + (labelsColors == "" ? "" : "\n") + card.labels[l].color;
          }
        }

        //Append row with data

        // if (Object.prototype.toString.call(s1) == Object.prototype.toString.call(s2)) {
        ss.appendRow([listId, cardId, dato, name, desc, fullname, listname, link, labels, labelsColors, checkliststr, duedate, duecomplete]);
        // };
        //change labels color ---
        var labelsColor = labelsColors.split('\n');
        if (labelsColor[0] == "sky") {
          ss.getRange(cr, 8).setBackground("#87CEFA");
        } else {
          ss.getRange(cr, 8).setBackground(labelsColor[0]);
          if ((labelsColor[0] == "red") || (labelsColor[0] == "black") || (labelsColor[0] == "purple") || (labelsColor[0] == "green") || (labelsColor[0] == "blue")) {
            ss.getRange(cr, 8).setFontColor("white");
          }
        }
        //change labels color END ---

        cr++;
      }
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);
  } finally {
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - loadTrello");
  }
}