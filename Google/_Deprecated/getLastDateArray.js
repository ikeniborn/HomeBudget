// получение максимальной даты в массиве
function getLastDateArray(array, filter) {
  var arrayDate = array.reduce(function (search, all) {
    if (all.sourceList == filter) {
      search.push(all.actionDate)
    } else if (filter == undefined) {
      search.push(all.actionDate)
    }
    return search
  }, [])
  var firstDate = startDate(90)
  var maxDate = arrayDate.reduce(function (a, b) {
    return a > b ? a : b
  }, firstDate)
  return new Date(maxDate.getTime() + 1000)
}