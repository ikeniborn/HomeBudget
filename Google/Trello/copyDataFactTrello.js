function copyDataFactTrello(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName) {
  var sourceSS = SpreadsheetApp.openById(sourceSheetID)
  var targetSS = SpreadsheetApp.openById(targetSheetID)
  var sourceSheet = sourceSS.getSheetByName(sourceSheetName)
  var targetSheet = targetSS.getSheetByName(targetSheetName)
  var sourceArray = sourceSheet.getDataRange().getValues()
  var targetArray = targetSheet.getDataRange().getValues()
  var arrayDate = []
  for (var j = 0; j < targetArray.length; j++) {
    if (targetArray[j][9] == 'Trello') {
      arrayDate.push(targetArray[j][0])
    }
  };

  var maxDate = arrayDate.reduce(function (a, b) {
    return a > b ? a : b
  }, startDate(1))

  var newData = sourceArray.filter(function (row) {
    return row[0] > new Date(maxDate.getTime())
  })
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
      var vComment = newData[i][8]
      targetSheet.appendRow([vData, vMonth, vCfo, vMvz, vBill, vItem, vNomeclature, vSum, vComment, 'Trello'])
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
  var maxRows = targetSheet.getMaxRows()
  var lastRow = targetSheet.getLastRow()
  if (maxRows - lastRow != 0) {
    targetSheet.deleteRows(lastRow + 1, maxRows - lastRow)
  }
}