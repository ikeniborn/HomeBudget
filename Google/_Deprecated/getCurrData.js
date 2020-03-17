function getCurrData(array, ymd) {
  try {
    var ssData
    if (ymd == undefined) {
      var ssData = array
    } else {
      ssData = array.filter(function (row) {
        return row.ymd == ymd
      })
    }
    return ssData
  } catch (e) {
    console.error('getCurrData: ' + e)
  }
}