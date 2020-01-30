function updateTrelloFact(postData, SheetID, SheetName) {
  // get sheet Google
  var ss = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  // get last date from source array
  var idAction = postData.action.id
  var commentDate = new Date(postData.action.date)
  var userName = postData.action.memberCreator.username
  var listName = postData.action.data.list.name
  var nomenclatureName = postData.action.data.card.name
  var actionDataText = postData.action.data.text
  var sumData = actionDataText.match(/^\d+/)
  var commentData = actionDataText.split(sumData).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
  var dataDirItem = accountingItem.filter(function (row) {
    return row.nomenclature == nomenclatureName
  })
  var billName = dataDirItem[0].bill
  var itemName = dataDirItem[0].account
  if (listName == 'Илья') {
    if (itemName == 'Зарплата') {
      var newFactPeriod = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth(), 1))
      var newFactPeriod0 = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth() - 1, 1))
      var revenueDay = commentDate.getDate()
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod-1', newFactPeriod0)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayIlya', revenueDay)
    }
    var period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya').value
  } else if (listName == 'Семья') {
    var period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily').value
  } else if (listName == 'Оксана') {
    if (itemName == 'Зарплата') {
      var newFactPeriod = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth(), 1))
      var revenueDay = commentDate.getDate()
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodOksana', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'revenueDayOksana', revenueDay)
    }
    var period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily').value
  }
  // добавление строк на страницу
  ss.appendRow([commentDate, period, listName, listName, billName, itemName, nomenclatureName, +sumData, commentData, idAction])
  return {
    date: commentDate,
    period: period,
    cfo: listName,
    bill: billName,
    account: itemName,
    nomenclature: nomenclatureName,
    sum: +sumData
  }
}