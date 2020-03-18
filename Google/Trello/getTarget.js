function getTarget(postObject) {
  try {
    var array = postObject.goalsArray
    var listName = postObject.listName
    var obj = {}
    obj.item = {}
    obj.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (listName.toLowerCase().match(array[1].toLowerCase())) {
          row = {}
          row.id = array[0]
          row.name = array[1]
          row.cfo = array[2]
          obj.item = row
          obj.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.name = array[1]
          row.cfo = array[2]
          obj.array.push(row)
        }
      }
    }, {})
    return obj
  } catch (e) {
    console.error('getTarget: ' + e)
  }
}