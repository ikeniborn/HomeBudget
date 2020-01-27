function deleteRowByIdAction(SheetID, SheetName, idAction) {
  var ssData = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  var allDataFact = ssData.getDataRange().getValues();
  var filterData = allDataFact.reduce(function (row, array, index) {
    if (array[9] == idAction) {
      ssData.deleteRow(index + 1)
    }
    return row
  }, [])
}