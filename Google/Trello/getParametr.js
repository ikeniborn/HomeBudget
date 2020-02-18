function getParametr(sheetArray, parametr) {
  var parametrArray = []
  sheetArray.reduce(function (row, array, index) {
    if (array[1] == parametr) {
      row = {}
      row.id = array[0]
      row.name = array[1]
      row.value = array[2]
      row.indexRow = index + 1
      parametrArray.push(row)
    }
  }, {})
  if (parametrArray.length == 1) {
    let parametrObject = parametrArray[0]
    return parametrObject
  } else {
    return parametrArray
  }
}