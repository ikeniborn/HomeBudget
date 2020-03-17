function getValues(sheet) {
  try {
    return sheet.getDataRange().getValues()
  } catch (e) {
    console.error('getValues: ' + e)
  }
}