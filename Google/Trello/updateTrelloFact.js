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
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod', newFactPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriod-1', newFactPeriod0)
    } else if (itemName == 'Аванс') {
      var newBudgetPeriod = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth() + 1, 1))
      var newBudgetPeriod2 = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth() + 2, 1))
      var newBudgetPeriod3 = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth() + 3, 1))
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodIlya', newBudgetPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodFamily', newBudgetPeriod)
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod', newBudgetPeriod2)
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod+1', newBudgetPeriod2)
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod+2', newBudgetPeriod3)
    }
    var period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya').value
  } else if (listName == 'Семья') {
    var period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily').value
  } else if (listName == 'Оксана') {
    if (itemName == 'Зарплата') {
      var newFactPeriod = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth(), 1))
      updateParametr(sourceSheetID, parametrSheetName, 'factPeriodOksana', newFactPeriod)
    } else if (itemName == 'Аванс') {
      var newBudgetPeriod = formatterDate(new Date(commentDate.getYear(), commentDate.getMonth() + 1, 1))
      updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodOksana', newBudgetPeriod)
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