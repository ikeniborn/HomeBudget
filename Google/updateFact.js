function intCommentfact() {
  var ss = SpreadsheetApp.openById("10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E") // Открываем книгу
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheet = ss.getSheetByName('Факт'); // 'Типы' - имя листа с содержимым списков
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getLastColumn()).sort({
    column: 1,
    ascending: true
  });
  var values = sheet.getDataRange().getValues();
  var DirItem = getDirItem(); // получение справочника статей
  var DirMvz = getDirMvz(); // получение справочника мвз
  for (var i = 1; i < values.length; ++i) {
    var row = i + 1;
    var rowDate = values[i][0];
    var rowPeriod = values[i][1];
    var rowCfo = values[i][2];
    var rowMvz = values[i][3];
    var rowBill = values[i][4];
    var rowItem = values[i][5];
    var rowNomeclature = values[i][6];
    var rowSum = values[i][7];
    var rowComment = values[i][8];
    var rowNewComment = values[i][9];
    var rowHash = values[i][10];

    if (rowHash.length == 0) {
      // Проверка МВЗ
      if (rowMvz.length == 0) {
        sheet.getRange(row, 4).setValue(rowCfo)
        var insertDirMvz = rowCfo
      } else {
        var dataDirMvz = DirMvz.filter(function (row) {
          return row[0] == rowMvz || row[1] == rowMvz
        })
        var sourceDirMvz = dataDirMvz[0][0]
        var insertDirMvz = dataDirMvz[0][1]
        if (sourceDirMvz == rowMvz) {
          sheet.getRange(row, 4).setValue(insertDirMvz)
        }
      }
      // Определение статьи
      if (rowBill.length == 0) {
        var dataDirItem = DirItem.filter(function (row) {
          return row[0] == rowNomeclature
        })
        var insertBill = dataDirItem[0][2];
        var insertItem = dataDirItem[0][1];
        // обновление ячеек
        sheet.getRange(row, 5).setValue(insertBill);
        sheet.getRange(row, 6).setValue(insertItem);
      }
      // Добавление комментари
      var insertCommect = rowCfo + "/" + insertDirMvz + "/" + rowComment + "/" + row
      sheet.getRange(row, 10).setValue(insertCommect)
      // Добавление hash записи строки
      var insertRow = [rowDate, rowPeriod, rowCfo, insertDirMvz, insertBill, insertItem, rowSum, rowComment, insertCommect]
      if (rowHash.length == 0) {
        var newHash = MD5(insertRow.join())
        sheet.getRange(row, 11).setValue(newHash)
      }
    }
  }
  var maxRows = sheet.getMaxRows();
  var lastRow = sheet.getLastRow();
  if (maxRows - lastRow != 0) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
  updateDataFact();
}

function updateDataFact() {
  var sourceSS = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E');
  var targetSS = SpreadsheetApp.openById('1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc');
  var sourceSheet = sourceSS.getSheetByName('Факт');
  var targetSheet = targetSS.getSheetByName('Факт');
  var sourceArray = sourceSheet.getDataRange().getValues();
  var targetArray = targetSheet.getDataRange().getValues();
  var arrayDate = [];
  for (var j = 0; j < targetArray.length; j++) {
    if (targetArray[j][9] == 'GoogleForm') {
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
      var vMvz = newData[i][3]
      var vBill = newData[i][4]
      var vItem = newData[i][5]
      var vNomeclature = newData[i][6]
      var vSum = newData[i][7]
      var vComment = newData[i][9]
      targetSheet.appendRow([vData, vMonth, vCfo, vMvz, vBill, vItem, vNomeclature, vSum, vComment, 'GoogleForm'])
      // Проверка перевода на счет семьи
      if (vItem == 'Перевод на счет Семья') {
        var insertdate = new Date(vData.getTime() + 1000);
        if (vCfo == 'Илья') {
          targetSheet.appendRow([insertdate, vMonth, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', vSum, vComment, 'GoogleForm'])
        } else if (vCfo == 'Оксана') {
          targetSheet.appendRow([insertdate, vMonth, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', vSum, vComment, 'GoogleForm'])
        }
      }
    }
  }
  // Удаление пустых строк
  var maxRows = targetSheet.getMaxRows();
  var lastRow = targetSheet.getLastRow();
  if (maxRows - lastRow != 0) {
    targetSheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
}