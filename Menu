//Создание меню в Google таблицах. Разместить функцию в тригерры по открытию файла.
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Обновление')
  .addSubMenu(ui.createMenu('Данные')
  .addItem('Обновить факт', 'updateDataFact')
  .addItem('Обновить бюджет', 'updateDataBudget'))
  .addItem('Отправить бюджет', 'ReportBudgetOksana')
  .addToUi();
}
