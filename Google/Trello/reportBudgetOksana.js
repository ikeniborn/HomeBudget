function reportBudgetOksana(globalVar) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet(globalVar.targetSheetID).getSheetByName("Б_Оксана"); //Выбираем нужный лист
  var salary = sheet.getRange(5, 3).getValues() //Зарплата до аванса
  var prepayment = sheet.getRange(6, 3).getValues() //Аванс
  var vacation = sheet.getRange(7, 3).getValues() //Отпускные
  var inaccumulation = sheet.getRange(17, 3).getValues() //Снятие с накоплений
  var outaccumulation = sheet.getRange(43, 3).getValues() //Положить в накопления
  var opermonth = sheet.getRange(44, 3).getValues() //Бюджет на месяц
  var familyTransh = sheet.getRange(46, 3).getValues() //Перечислить на счет семьи
  // тема письма
  var subject = "Бюджет на месяц";
  //формируем текст сообщения
  var message = "Данные по запланированным статьям и перечислениям по плану:" +
    "\n" +
    "\nЗарплата до аванса: " + salary +
    "\nАванс: " + prepayment +
    "\nОтпускные: " + vacation +
    "\nСнятие с накоплений: " + inaccumulation +
    "\nБюджет на месяц: " + opermonth +
    "\nПеречислить на счет семьи до аванса: " + familyTransh +
    "\nПоложить в накопления: " + outaccumulation;
  MailApp.sendEmail("novikova_oa@magnit.ru,ikeniborn@gmail.com", subject, message);
}