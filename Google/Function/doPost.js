function doPost(e) {
  var postData = JSON.parse(e.postData.contents)
  var ss = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E')
  var sheet = ss.getSheetByName('test')
  sheet.getRange(1, 1).setValue(postData)
  if (postData.action.type == 'commentCard') {
    if (new Date(postData.action.date) > new Date(maxDateFact.getTime()) && postData.action.data.board.name == targetSheetNameFact) {
      var postDataEvent = updateTrelloFact(postData)
      if (postDataEvent) {
        addReaction(apiRoot, apiToken, apiKey, postData.action.id)
        copyData(sourceSheetID, targetSheetID, sourceSheetNameFact, targetSheetNameBudget)
      }
    } else if (new Date(postData.action.date) > new Date(maxDateBudget.getTime()) && postData.action.data.board.name == targetSheetNameBudget) {
      var postDataEvent = updateTrelloBudget(postData)
      if (postDataEvent) {
        addReaction(apiRoot, apiToken, apiKey, postData.action.id)
        copyData(sourceSheetID, targetSheetID, sourceSheetNameBudget, targetSheetNameBudget)
      }
    }
  }
}