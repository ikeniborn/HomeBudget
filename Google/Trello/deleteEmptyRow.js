function deleteEmptyRow(postObject) {
  try {
    var ss
    var ts
    if (postObject.isFact) {
      ss = postObject.sourceSheetNameFactTrelloOpen
      ts = postObject.targetSheetNameFactOpen
    } else if (postObject.isBudget) {
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      ts = postObject.targetSheetNameBudgetOpen
    }
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