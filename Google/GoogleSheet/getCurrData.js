function getCurrData(array) {
  // array - массив данных со старицы. получается функцией getAllData(SheetID, SheetName) 
  // ymd - дата в формате yyyymmdd
  var ymd = getYMD(getParametr(sourceSheetID, parametrSheetName, 'factPeriod').value).ymd
  var ssData = array.filter(function (row) {
    return getYMD(row.period).ymd == ymd
  })
  return ssData
}