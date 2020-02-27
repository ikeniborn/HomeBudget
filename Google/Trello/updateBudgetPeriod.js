function updateBudgetPeriod(postObject) {
  try {
    var currBudgetPeriod = getPeriod(postObject, postObject.boardIdBudget).period
    var newBudgetPeriod = formatterDate(new Date(currBudgetPeriod.getYear(), currBudgetPeriod.getMonth() + 1, 1)).date
    if (['Илья'].indexOf(postObject.listName) !== -1) {
      updateParametr(postObject, 'periodBudgetIlya', newBudgetPeriod)
    } else if (['Оксана'].indexOf(postObject.listName) !== -1) {
      updateParametr(postObject, 'periodBudgetOksana', newBudgetPeriod)
    } else if (['Семья'].indexOf(postObject.listName) !== -1) {
      updateParametr(postObject, 'periodBudgetFamily', newBudgetPeriod)
    }
    postObject.parametrArray = SpreadsheetApp.openById(postObject.sourceSheetID).getSheetByName(postObject.parametrSheetName).getDataRange().getValues()
  } catch (e) {
    console.error('updateBudgetPeriod: ' + e)
  }
}