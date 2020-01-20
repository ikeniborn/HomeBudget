function doPost(e) {
  var sourceSheetID = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
  var sourceSheetName = 'test'
  if (typeof e !== 'undefined')
    Logger.log(e.parameter);
  var ss = SpreadsheetApp.openById(sourceSheetID)
  var sheet = ss.getSheetByName(sourceSheetName)
  sheet.getRange(1, 1).setValue(JSON.parse(e.postData.contents))
  return ContentService.createTextOutput(JSON.stringify(e))
}