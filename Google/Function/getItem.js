function getItem(item) {
    var ss = SpreadsheetApp.openById("10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E") //Открываем книгу
    SpreadsheetApp.setActiveSpreadsheet(ss); //Делаем книгу активной
    var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Статья'); //'Типы' - имя листа с содержимым списков
    var metaData = metaSheet.getDataRange().getValues();
    var metaValue = metaData.filter(function (row) {
        return row[0] == item
    });
    for (i = 0; i < metaValue.length; i++) {
        return rowData[i][1]
    }
}