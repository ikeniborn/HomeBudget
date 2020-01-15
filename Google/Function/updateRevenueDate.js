function updateRevenueDate(sheetID, sheetName, revenueDate, cfo) {
  var ss = SpreadsheetApp.openById(sheetID) // Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss); // Делаем книгу активной
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); //'Типы' - имя листа с содержимым списков
  var revenueDay = new Date(revenueDate).getDate()
  if (cfo == 'Илья') {
    metaSheet.getRange(2, 3).setValue(revenueDay)
  } else if (cfo == 'Оксана') {
    metaSheet.getRange(2, 4).setValue(revenueDay)
  }
}