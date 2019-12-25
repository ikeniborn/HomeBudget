function maxDate() {
  var sourceSS = SpreadsheetApp.openById('ID')
  var sourceSheet = sourceSS.getSheetByName('NameSheet')
  var sourceArray = sourceSheet.getDataRange().getValues() /* Get data array */
  var arrayDate = []
  /* get array with date */
  for (var j = 1; j < sourceArray.length; ++j) {
    arrayDate.push(sourceArray[j][0])
  };
  /* Get Max date */
  var Example1 = arrayDate.reduce(function (a, b) {
    return a > b ? a : b
  })
  var Example2 = new Date(Math.max.apply(null, arrayDate))
  /* Get min date */
  var Example1 = arrayDate.reduce(function (a, b) {
    return a < b ? a : b
  })
  var Example2 = new Date(Math.min.apply(null, arrayDate))
}
