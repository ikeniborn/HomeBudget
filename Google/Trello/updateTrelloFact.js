// trello variables
var apiKey = '9dae7dd3ce328d61e67edb4557149502'
var apiToken = getTokenTrello()
var apiRoot = 'https://api.trello.com/1/'
var boardId = '5e05161dc3abef51fcf4e761'
var googleId = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
var sheetName = 'Trello'
var enableStackdriverLogging = true
var logingName = 'ilyatischenko'
var factPeriodNow = getMetadata(googleId, 'Период')[0][0]
var factPeriodPrev = getMetadata(googleId, 'Период')[1][0]
var revenueDayIlya = getMetadata(googleId, 'Период')[0][2]
var revenueDayOksana = getMetadata(googleId, 'Период')[0][3]
var dirItem = getDirItem() // получение справочника статей
var currDate = new Date().getDate()

function loadFromTrello() {
  try {
    if (enableStackdriverLogging) console.time(logingName + ' - loadTrello')
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello STARTED')

    // get sheet Google
    var ss = SpreadsheetApp.openById(googleId).getSheetByName(sheetName)

    // get last data from board. Function return array with next attribute [commentDate, userName, listName, nomenclatureName, sumData, comment]
    var lastDataFromTrello = loadFromTrello(apiKey, apiToken, apiRoot, boardId, googleId, sheetName)
    for (var i = 0; i < lastDataFromTrello.length; i++) {
      var commentDate = new Date(lastDataFromTrello[i][0])
      var userName = lastDataFromTrello[i][1]
      var listName = lastDataFromTrello[i][2]
      var nomenclatureName = lastDataFromTrello[i][3]
      var sumData = lastDataFromTrello[i][4]
      var commentData = lastDataFromTrello[i][5]
      var factPeriod = []
      if (factPeriodPrev.length == 0) {
        factPeriod = factPeriodNow
      } else {
        if (listName !== 'Оксана') {
          if (currDate >= revenueDayIlya) {
            factPeriod = factPeriodNow
          } else {
            factPeriod = factPeriodPrev
          }
        } else {
          if (currDate >= revenueDayOksana) {
            factPeriod = factPeriodNow
          } else {
            factPeriod = factPeriodPrev
          }
        }
      }
      var dataDirItem = dirItem.filter(function (row) {
        return row[0] == nomenclatureName
      })
      var insertBill = dataDirItem[0][2]
      var insertItem = dataDirItem[0][1]

      ss.appendRow([commentDate, factPeriod, listName, listName, insertBill, insertItem, nomenclatureName, sumData, commentData, userName])
      //            Обновление даты зарплаты
      if (insertItem == 'Зарплата') {
        // update date for budget period. Start with next parametr (sheetID, sheetName, commentDate, listName)
        updateRevenueDate(googleId, 'Период', commentDate, listName)
      }
    }
    // Удаление пустых строк
    var maxRows = ss.getMaxRows()
    var lastRow = ss.getLastRow()
    if (maxRows - lastRow != 0) {
      ss.deleteRows(lastRow + 1, maxRows - lastRow)
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + ' ERROR: ' + e)
  } finally {
    if (enableStackdriverLogging) console.log(logingName + ' - Loading from Trello ENDED')
    if (enableStackdriverLogging) console.timeEnd(logingName + ' - loadTrello')
  }
  updateDataFactTrello()
}

function updateDataFactTrello() {
  var sourceSS = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E')
  var targetSS = SpreadsheetApp.openById('1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc')
  var sourceSheet = sourceSS.getSheetByName('Trello')
  var targetSheet = targetSS.getSheetByName('Факт')
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