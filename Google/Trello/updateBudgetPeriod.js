function updateBudgetPeriod(globalVar, postObject) {
  try {
    var currBudgetPeriod = getPeriod(globalVar, globalVar.boardIdBudget, postObject.cfo).period
    var newBudgetPeriod = formatterDate(new Date(currBudgetPeriod.getYear(), currBudgetPeriod.getMonth() + 1, 1)).date
    if (['Илья'].indexOf(postObject.cfo) !== -1) {
      updateParametr(globalVar, 'periodBudgetIlya', newBudgetPeriod)
    } else if (['Оксана'].indexOf(postObject.cfo) !== -1) {
      updateParametr(globalVar, 'periodBudgetOksana', newBudgetPeriod)
    } else if (['Семья'].indexOf(postObject.cfo) !== -1) {
      updateParametr(globalVar, 'periodBudgetFamily', newBudgetPeriod)
    }
    globalVar.parametrArray = SpreadsheetApp.openById(globalVar.sourceSheetID).getSheetByName(globalVar.parametrSheetName).getDataRange().getValues()
  } catch (e) {
    console.error('updateBudgetPeriod: ' + e)
  } finally {
    console.log('updateBudgetPeriod: complete')
  }
}