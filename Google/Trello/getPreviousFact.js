function getPreviousFact(postObject) {
  var sum = {}
  const postObjectPrev1 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev1.period = postObject.factPeriod
  postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
  postObjectPrev1.dataAccount = getAllData(postObjectPrev1, 'account')
  postObjectPrev1.dataAccountFactCurr = postObjectPrev1.dataAccount.factCurr
  postObjectPrev1.dataAccountBudgetCurr = postObjectPrev1.dataAccount.budgetCurr
  const postObjectPrev2 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev2.period = postObject.factPeriod0
  postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
  postObjectPrev2.dataAccount = getAllData(postObjectPrev2, 'account')
  postObjectPrev2.dataAccountFactCurr = postObjectPrev2.dataAccount.factCurr
  postObjectPrev2.dataAccountBudgetCurr = postObjectPrev2.dataAccount.budgetCurr
  sum.Prev2 = getSum(postObjectPrev2)
  return sum
}