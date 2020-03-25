function getParametr(postObject) {
  try {
    var array = postObject.parametrArray
    var parametr = {}
    parametr.item = {}
    parametr.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (postObject.cfo == array[2] && array[1] == postObject.type) {
          row = {}
          row.id = array[0]
          row.type = array[1]
          row.cfo = array[2]
          row.value = new Date(array[3])
          row.indexRow = index + 1
          parametr.item = row
          parametr.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.type = array[1]
          row.cfo = array[2]
          row.value = new Date(array[3])
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