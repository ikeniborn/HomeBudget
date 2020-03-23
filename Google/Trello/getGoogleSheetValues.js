function getGoogleSheetValues(openSheet) {
  try {
    return openSheet.getDataRange().getValues()
  } catch (e) {
    console.error('getValues: ' + e)
  }
}