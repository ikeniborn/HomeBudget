function updateTrelloFact(postData) {
  // get sheet Google
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(sourceSheetName)
  // get last date from source array

  if (new Date(postData.action.date) > new Date(maxDate.getTime()) && postData.action.type == 'commentCard') {
    var commentDate = new Date(postData.action.date)
    var userName = postData.action.memberCreator.username
    var listName = postData.action.data.list.name
    var nomenclatureName = postData.action.data.card.name
    var actionDataText = postData.action.data.text
    var sumData = actionDataText.match(/^\d+/)
    var commentData = actionDataText.split(sumData).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
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
    var dataDirItem = accountingItem.filter(function (row) {
      return row[1] == nomenclatureName
    })
    var billName = dataDirItem[0][3]
    var itemName = dataDirItem[0][2]

    ss.appendRow([commentDate, factPeriod, listName, listName, billName, itemName, nomenclatureName, +sumData, commentData, userName])
    // Обновление даты зарплаты
    if (itemName == 'Зарплата') {
      // update date for budget period. Start with next parametr (sheetID, SheetName, commentDate, listName)
      updateRevenueDate(sourceSheetID, periodSheetName, commentDate, listName)
    }
    var actionId = postData.action.id
    addReaction(apiRoot, apiToken, apiKey, boardId, actionId)
    // Удаление пустых строк
    var maxRows = ss.getMaxRows()
    var lastRow = ss.getLastRow()
    if (maxRows - lastRow != 0) {
      ss.deleteRows(lastRow + 1, maxRows - lastRow)
    }
    return true
  }
}