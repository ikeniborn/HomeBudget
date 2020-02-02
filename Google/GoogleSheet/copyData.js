function copyData(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName) {
  var targetSS = SpreadsheetApp.openById(targetSheetID).getSheetByName(targetSheetName)
  var sourceArray = getAllData(sourceSheetID, sourceSheetName)
  var targetArray = getAllData(sourceSheetID, sourceSheetName)

  var maxDateTarget = getLastDateArray(targetArray, sourceSheetName)

  var newData = sourceArray.filter(function (row) {
    return row[0] > new Date(maxDateTarget.getTime())
  })
  // TODO перевести на испольование свойств абоирубтов
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
      targetSS.appendRow([vData, vMonth, vCfo, vMvz, vBill, vItem, vNomeclature, vSum, vComment, sourceSheetName])
      // Проверка перевода на счет семьи
      if (vItem == 'Перевод на счет Семья') {
        var insertdate = new Date(vData.getTime() + 1000);
        if (vCfo == 'Илья') {
          targetSS.appendRow([insertdate, vMonth, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', vSum, vComment, sourceSheetName])
        } else if (vCfo == 'Оксана') {
          targetSS.appendRow([insertdate, vMonth, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', vSum, vComment, sourceSheetName])
        }
      }
    }
  }
  // Удаление пустых строк
  deleteEmptyRow(targetSheetID, targetSheetName)
}