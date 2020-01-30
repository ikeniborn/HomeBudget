function updateBudgetPeriod(parametr) {
  // parametr - параметр даты получения зарплаты
  const revenueDay = getParametr(sourceSheetID, parametrSheetName, parametr).value
  const currDate = new Date().getDate()
  if (parametr == 'revenueDayIlya' && currDate > (revenueDay + 5)) {
    var newBudgetPeriod = formatterDate(new Date(new Date().getYear(), new Date().getMonth() + 1, 1))
    var newBudgetPeriod2 = formatterDate(new Date(new Date().getYear(), new Date().getMonth() + 2, 1))
    var newBudgetPeriod3 = formatterDate(new Date(new Date().getYear(), new Date().getMonth() + 3, 1))
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodIlya', newBudgetPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodFamily', newBudgetPeriod)
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod', newBudgetPeriod2)
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod+1', newBudgetPeriod2)
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriod+2', newBudgetPeriod3)
  } else if (parametr == 'revenueDayOksana' && currDate > (revenueDay + 5)) {
    var newBudgetPeriod = formatterDate(new Date(new Date().getYear(), new Date().getMonth() + 1, 1))
    updateParametr(sourceSheetID, parametrSheetName, 'budgetPeriodOksana', newBudgetPeriod)
  }
}