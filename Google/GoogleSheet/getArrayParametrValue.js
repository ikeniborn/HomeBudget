function getArrayParametrValue(sourceSheetID, parametrSheetName, ArrayParametrs) {
  var array = ArrayParametrs
  var allAttr = []
  array.forEach(function (attr) {
    var value = getParametr(sourceSheetID, parametrSheetName, attr).value
    if (isValidDate(value)) {
      var parametr = formatterDate(value)
    } else {
      var parametr = value
    }
    parametr && allAttr.push(parametr)
  })
  return allAttr
}