function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var text
    if (Object.prototype.toString.call(postObject.comment) == '[object String]') {
      text = postObject.comment
      var mvz = {}
      mvz.item = {}
      mvz.array = []
      array.reduce(function (row, array) {
        if (text.toLowerCase().replace(/\s+/g, '').trim().match(array[2].toLowerCase())) {
          row = {}
          row.id = array[0]
          row.mvz = array[1]
          row.tag = array[2]
          mvz.item = row
          mvz.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.mvz = array[1]
          row.tag = array[2]
          mvz.array.push(row)
        }
      }, {})
    } else {
      mvz = postObject.listName
    }
    return mvz
  } catch (e) {
    console.error('getCostСenter: ' + e)
  }
}