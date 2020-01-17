function updateRevenueDate(sheetID, sheetName, commentDate, listName) {
  var ss = SpreadsheetApp.openById(sheetID) // Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss); // Делаем книгу активной
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); //'Типы' - имя листа с содержимым списков
  var revenueDay = new Date(commentDate).getDate()
  if (listName == 'Илья') {
    metaSheet.getRange(2, 3).setValue(revenueDay)
  } else if (listName == 'Оксана') {
    metaSheet.getRange(2, 4).setValue(revenueDay)
  }
}