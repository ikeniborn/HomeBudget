function getParametr(postObject, value) {
  try {
    var array = postObject.parametrArray
    var parametr = {}
    parametr.item = {}
    parametr.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (array[1] == value) {
          row = {}
          row.id = array[0]
          row.name = array[1]
          row.value = array[2]
          row.indexRow = index + 1
          parametr.item = row
          parametr.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.name = array[1]
          row.value = array[2]
          row.indexRow = index + 1
          parametr.array.push(row)
        }
      }
    }, {})
    return parametr
  } catch (e) {
    console.error('getParametr: ' + e)
  }
}