function getPreviousFact(postObject) {
  var sum = {}
  const postObjectPrev1 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev1.period = postObject.factPeriod
  postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
  postObjectPrev1.dataAccount = getAllData(postObjectPrev1, 'account')
  postObjectPrev1.dataAccountFactCurr = getCurrData(postObjectPrev1, 'Факт')
  postObjectPrev1.dataAccountBudgetCurr = getCurrData(postObjectPrev1, 'Бюджет')
  sum.Prev1 = getSum(postObjectPrev1)
  const postObjectPrev2 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev2.period = postObject.factPeriod0
  postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
  postObjectPrev2.dataAccount = getAllData(postObjectPrev2, 'account')
  postObjectPrev2.dataAccountFactCurr = getCurrData(postObjectPrev2, 'Факт')
  postObjectPrev2.dataAccountBudgetCurr = getCurrData(postObjectPrev2, 'Бюджет')
  sum.Prev2 = getSum(postObjectPrev2)
  return sum
}