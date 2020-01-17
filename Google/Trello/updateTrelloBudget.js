// trello variables
var apiKey = '9dae7dd3ce328d61e67edb4557149502'
var apiToken = getTokenTrello()
var apiRoot = 'https://api.trello.com/1/'
var boardId = '5e05161dc3abef51fcf4e761'
var sourceSheetID = '10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E'
var sourceSheetName = 'trelloBudget'
var metadataSheetName = 'period'
var targetSheetID = '1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc'
var targetSheetName = 'Бюджет'
// getMetadata(sourceSheetID, sourceSheetName) получение данных по периодам.
var budgetPeriodNow = getMetadata(sourceSheetID, metadataSheetName)[0][1]
var budgetPeriodPrev = getMetadata(sourceSheetID, metadataSheetName)[1][1]
var revenueDayIlya = getMetadata(sourceSheetID, metadataSheetName)[0][2]
var revenueDayOksana = getMetadata(sourceSheetID, metadataSheetName)[0][3]
//  getDirItem() получение справочника статей
var dirItem = getDirItem() // получение справочника статей
var currDate = new Date().getDate()

function updateTrelloBudget() {

  // get sheet Google
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName)

  // get last data from board. Function return array with next attribute [commentDate, userName, listName, nomenclatureName, sumData, comment]
  // loadFromTrello(apiKey, apiToken, apiRoot, boardId, sourceSheetID, sourceSheetName)
  var lastDataFromTrello = loadFromTrello(apiKey, apiToken, apiRoot, boardId, sourceSheetID, sourceSheetName)

  for (var i = 0; i < lastDataFromTrello.length; i++) {
    var commentDate = new Date(lastDataFromTrello[i][0])
    var userName = lastDataFromTrello[i][1]
    var listName = lastDataFromTrello[i][2]
    var nomenclatureName = lastDataFromTrello[i][3]
    var sumData = lastDataFromTrello[i][4]
    var commentData = lastDataFromTrello[i][5]
    var factPeriod = []
    if (budgetPeriodPrev.length == 0) {
      factPeriod = budgetPeriodNow
    } else {
      if (listName !== 'Оксана') {
        if (currDate >= revenueDayIlya) {
          factPeriod = budgetPeriodNow
        } else {
          factPeriod = budgetPeriodPrev
        }
      } else {
        if (currDate >= revenueDayOksana) {
          factPeriod = budgetPeriodNow
        } else {
          factPeriod = budgetPeriodPrev
        }
      }
    }
    var dataDirItem = dirItem.filter(function (row) {
      return row[0] == nomenclatureName
    })
    var billName = dataDirItem[0][2]
    var itemName = dataDirItem[0][1]

    ss.appendRow([commentDate, factPeriod, listName, billName, itemName, nomenclatureName, sumData, commentData, userName])

  }
  // Удаление пустых строк
  var maxRows = ss.getMaxRows()
  var lastRow = ss.getLastRow()
  if (maxRows - lastRow != 0) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow)
  }

  // copyData(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName) копирование данных из истоничка в учет
  copyData(sourceSheetID, targetSheetID, sourceSheetName, targetSheetName)
}