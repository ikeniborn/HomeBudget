function updateDataFact() {
    var sourceSS = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E');
    var targetSS = SpreadsheetApp.openById('1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc');
    var sourceSheet = sourceSS.getSheetByName('Факт');
    var targetSheet = targetSS.getSheetByName('Факт');
    var sourceArray = sourceSheet.getDataRange().getValues();
    var sourceSum = 0;
    for (var i = 1; i < sourceArray.length; ++i) {
        var sourceRowData = sourceArray[i]
        sourceSum += +sourceRowData[6];
    }
    var targetArray = targetSheet.getDataRange().getValues();
    var targetSum = 0;
    for (var i = 1; i < targetArray.length; ++i) {
        var targetRowData = targetArray[i]
        targetSum += +targetRowData[6];
    }
    var rows = sourceArray.length;
    var columns = sourceArray[0].length;
    if (targetArray.length != sourceArray.length || sourceSum != targetSum) {
        targetSheet.clear();
        targetSheet.getRange(1, 1, rows, columns).setValues(sourceArray);
        //Удаление пустых строк
        var maxRows = targetSheet.getMaxRows();
        var lastRow = targetSheet.getLastRow();
        if (maxRows - lastRow != 0) {
            targetSheet.deleteRows(lastRow + 1, maxRows - lastRow);
        }
    }
}
``