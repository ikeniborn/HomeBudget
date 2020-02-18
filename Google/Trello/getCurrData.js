function getCurrData(array, ymd) {
  var ssData
  if (ymd == undefined) {
    var ssData = array
  } else {
    ssData = array.filter(function (row) {
      return getYMD(row.period).ymd == ymd
    })
  }
  return ssData
}