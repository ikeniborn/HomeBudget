function getGoogleSheetValues(openSheet) {
  try {
    return openSheet.getDataRange().getValues()
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}