function updateParametr(sourceSheetID, parametrSheetName, commentDate, listName) {
  // Function update budget date
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(parametrSheetName);
  var revenueDay = new Date(commentDate).getDate()
  if (listName == 'Илья') {
    var row = getParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya').id + 1
    ss.getRange(row, 3).setValue(revenueDay)
  } else if (listName == 'Оксана') {
    var row = getParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana').id + 1
    metaSheet.getRange(row, 3).setValue(revenueDay)
  }
}