function intCommentbudget() {
  var ss = SpreadsheetApp.openById("10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E") //Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheet = ss.getSheetByName('Бюджет'); //'Типы' - имя листа с содержимым списков
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getLastColumn()).sort({
    column: 1,
    ascending: true
  });
  var values = sheet.getDataRange().getValues();
  var DirItem = getDirItem(); //получение справочника статей
  var DirMvz = getDirMvz(); //получение справочника мвз
  for (var i = 1; i < values.length; ++i) {
    var row = i + 1;
    var rowDate = values[i][0];
    var rowPeriod = values[i][1];
    var rowCfo = values[i][2];
    var rowBill = values[i][3];
    var rowItem = values[i][4];
    var rowNomenclature = values[i][5];
    var rowSum = values[i][6];
    var rowComment = values[i][7];
    var rowHash = values[i][9];

    if (rowHash.length == 0) {
      //Определение статьи
      if (rowBill.length == 0) {
        var dataDirItem = DirItem.filter(function (row) {
          return row[0] == rowNomenclature
        })
        var insertBill = dataDirItem[0][2];
        var insertItem = dataDirItem[0][1];
        //обновление ячеек
        sheet.getRange(row, 4).setValue(insertBill);
        sheet.getRange(row, 5).setValue(insertItem);
      }
      //Добавление комментари
      var insertCommect = rowCfo + "/" + rowComment + "/" + row
      sheet.getRange(row, 9).setValue(insertCommect)
      //Добавление hash записи строки
      var insertRow = [rowDate, rowPeriod, rowCfo, insertBill, insertItem, rowNomenclature, rowSum, rowComment, insertCommect]
      if (rowHash.length == 0) {
        var newHash = MD5(insertRow.join())
        sheet.getRange(row, 10).setValue(newHash)
      }
    }
  }
  var maxRows = sheet.getMaxRows();
  var lastRow = sheet.getLastRow();
  if (maxRows - lastRow != 0) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
  updateDataBudget()
}

function updateDataBudget() {
  var sourceSS = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E');
  var targetSS = SpreadsheetApp.openById('1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc');
  var sourceSheet = sourceSS.getSheetByName('Бюджет');
  var targetSheet = targetSS.getSheetByName('Бюджет');
  var sourceArray = sourceSheet.getDataRange().getValues();
  var targetArray = targetSheet.getDataRange().getValues();
  var arrayDate = [];
  for (var j = 0; j < targetArray.length; j++) {
    if (targetArray[j][8] == 'GoogleForm') {
      arrayDate.push(targetArray[j][0]);
    }
  };

  var maxDate = arrayDate.reduce(function (a, b) {
    return a > b ? a : b;
  });
  var newData = sourceArray.filter(function (row) {
    return row[0] > new Date(maxDate.getTime());
  });
  if (newData.length > 0) {
    for (var i = 0; i < newData.length; i++) {
      var vData = newData[i][0]
      var vMonth = newData[i][1]
      var vCfo = newData[i][2]
      var vBill = newData[i][3]
      var vItem = newData[i][4]
      var vNomeclature = newData[i][5]
      var vSum = newData[i][6]
      var vComment = newData[i][8]
      targetSheet.appendRow([vData, vMonth, vCfo, vBill, vItem, vNomeclature, vSum, vComment, 'GoogleForm'])
      // Проверка перевода на счет семьи
      if (vItem == 'Перевод на счет Семья') {
        var insertdate = new Date(vData.getTime() + 1000);
        if (vCfo == 'Илья') {
          targetSheet.appendRow([insertdate, vMonth, 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', vSum, vComment, 'GoogleForm'])
        } else if (vCfo == 'Оксана') {
          targetSheet.appendRow([insertdate, vMonth, 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', vSum, vComment, 'GoogleForm'])
        }
      }
    }
  }
  //Удаление пустых строк
  var maxRows = targetSheet.getMaxRows();
  var lastRow = targetSheet.getLastRow();
  if (maxRows - lastRow != 0) {
    targetSheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
}