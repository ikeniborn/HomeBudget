function getCurrData(array, ymd) {
  var ssData
  if (ymd == undefined) {
    var ssData = array
  } else {
    // array - массив данных со старицы. получается функцией getAllData(SheetID, SheetName) 
    ssData = array.filter(function (row) {
      return getYMD(row.period).ymd == ymd
    })
  }
  return ssData
}