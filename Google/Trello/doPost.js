function doPost(e) {
  var postData = JSON.parse(e.postData.contents)
  // отладка вебхука
  var ss = SpreadsheetApp.openById(sourceSheetID)
  var sheet = ss.getSheetByName('test')
  sheet.getRange(1, 1).setValue(postData)
  // проверка события и вебхука
  if (postData.action.type == 'commentCard') {
    if (postData.action.data.board.name == targetSheetNameFact) {
      if (new Date(postData.action.date) > new Date(maxDateFact.getTime())) {
        var postDataEvent = updateTrelloFact(postData)
        if (postDataEvent) {
          copyData(sourceSheetID, targetSheetID, sourceSheetNameFact, targetSheetNameFact)
        }
      }
    } else if (postData.action.data.board.name == targetSheetNameBudget) {
      if (new Date(postData.action.date) > new Date(maxDateBudget.getTime())) {
        var postDataEvent = updateTrelloBudget(postData)
        if (postDataEvent) {
          copyData(sourceSheetID, targetSheetID, sourceSheetNameBudget, targetSheetNameBudget)
        }
      }
    }
    if (postData.action.memberCreator.username == 'oksanatischenko') {
      addReaction(apiRoot, apiToken, apiKey, postData.action.id, buuReaction)
    } else {
      addReaction(apiRoot, apiToken, apiKey, postData.action.id, jackdawReaction)
    }
  }
}