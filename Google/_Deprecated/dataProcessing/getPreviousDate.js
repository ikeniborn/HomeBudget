// Get date before some day from now. n - day
function getPreviousDate(n) {
  /*
   * n - количество дней
   */
  var endDate = new Date()
  var startDate = new Date()
  startDate.setDate(endDate.getDate() - n)
  return startDate
}