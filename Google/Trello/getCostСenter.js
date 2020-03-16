function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var text = postObject.comment
    var cfo = postObject.cfo
    var mvz = {}
    mvz.item = {}
    mvz.array = []
    if (Object.prototype.toString.call(postObject.comment) == '[object String]') {
      array.reduce(function (row, array, index) {
        if (index > 0) {
          if (text.toLowerCase().replace(/\s+/g, '').trim().match(array[2].toLowerCase())) {
            row = {}
            row.id = array[0]
            row.mvz = array[1]
            row.tag = array[2]
            mvz.item = row
            mvz.array.push(row)
          } else if (cfo.toLowerCase().replace(/\s+/g, '').trim().match(array[2].toLowerCase())) {
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
        }
      }, {})
    } else {
      mvz = postObject.cfo
    }
    return mvz
  } catch (e) {
    console.error('getCostСenter: ' + e)
  }
}