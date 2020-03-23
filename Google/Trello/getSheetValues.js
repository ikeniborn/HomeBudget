function getSheetValues(openSheet, sheetName) {
  try {
    return openSheet.getSheetByName(sheetName).getDataRange().getValues()
  } catch (e) {
    console.error('getValues: ' + e)
  }
}