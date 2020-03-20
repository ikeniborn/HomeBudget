function deleteEmptyRow(postObject) {
  try {
    var ss = postObject.trelloOpen
    var ts = postObject.accountOpen
    var ssMaxRows = ss.getMaxRows()
    var ssLastRow = ss.getLastRow()
    if (ssMaxRows - ssLastRow !== 0) {
      ss.deleteRows(ssLastRow + 1, ssMaxRows - ssLastRow)
    }
    var tsMaxRows = ts.getMaxRows()
    var tsLastRow = ts.getLastRow()
    if (tsMaxRows - tsMaxRows !== 0) {
      ss.deleteRows(tsLastRow + 1, tsMaxRows - tsLastRow)
    }
  } catch (e) {
    console.error('deleteEmptyRow: ' + e)
  }
}