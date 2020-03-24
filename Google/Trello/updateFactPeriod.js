/* eslint-disable no-undef */
function updateFactPeriod(postObject) {
  try {
    updateParametr(postObject, postObject.budgetPeriod)
    postObject.parametrArray = getGoogleSheetValues(postObject.parametrSheetOpen)
  } catch (e) {
    console.error('updateFactPeriod: ' + e)
  } finally {
    console.log('updateFactPeriod:complete')
  }
}