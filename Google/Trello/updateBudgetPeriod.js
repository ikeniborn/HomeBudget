function updateBudgetPeriod(postObject) {
  try {
    updateParametr(postObject, postObject.budgetPeriod2)
    postObject.parametrArray = getGoogleSheetValues(postObject.parametrSheetOpen)
  } catch (e) {
    console.error('updateBudgetPeriod: ' + e)
  } finally {
    console.log('updateBudgetPeriod:complete')
  }
}