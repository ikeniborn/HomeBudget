function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var text = postObject.text
    var mvz = {}
    mvz.item = {}
    mvz.array = []
    array.reduce(function (row, array) {
      if (text.toLowerCase().match(array[2].toLowerCase())) {
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
    return mvz
  } catch (e) {
    console.error('getCostСenter: ' + e)
  }
}