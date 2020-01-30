function getPeriod(boardName, listName) {
  var period
  if (boardName == targetSheetNameFact) {
    if (listName == 'Илья') {
      period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya').value
    } else if (listName == 'Семья') {
      period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodFamily').value
    } else if (listName == 'Оксана') {
      period = getParametr(sourceSheetID, parametrSheetName, 'factPeriodIlya').value
    }
  } else if (boardName == targetSheetNameBudget) {
    if (listName == 'Илья') {
      period = getParametr(sourceSheetID, parametrSheetName, 'budgetPeriodIlya').value
    } else if (listName == 'Семья') {
      period = getParametr(sourceSheetID, parametrSheetName, 'budgetPeriodFamily').value
    } else if (listName == 'Оксана') {
      period = getParametr(sourceSheetID, parametrSheetName, 'budgetPeriodOksana').value
    }
  }
  return period
}