function updateRevenueDate(sheetID, sheetName, commentDate, listName) {
  // Function update budget date
  var ss = SpreadsheetApp.openById(sheetID) // Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss); // Делаем книгу активной
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  var revenueDay = new Date(commentDate).getDate()
  if (listName == 'Илья') {
    metaSheet.getRange(2, 3).setValue(revenueDay)
  } else if (listName == 'Оксана') {
    metaSheet.getRange(2, 4).setValue(revenueDay)
  }
}