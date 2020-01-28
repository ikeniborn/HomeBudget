function filterDataFromArray(array, ymd) {
  // array - массив данных со старицы. получается функцией getAllData(SheetID, SheetName) 
  // ymd - дата в формате yyyymmdd
  var ssData = array.filter(function (row) {
    return getYMD(row.period).ymd == ymd
  })
  return ssData
}