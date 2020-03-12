function getPreviousFact(postObject) {
  var sum = {}
  const postObjectPrev1 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev1.period = postObject.factPeriod
  postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
  postObjectPrev1.isFact = true
  postObjectPrev1.isBudget = false
  sum.Prev1 = getSum(postObjectPrev1)
  const postObjectPrev2 = JSON.parse(JSON.stringify(postObject))
  postObjectPrev2.period = postObject.factPeriod0
  postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
  postObjectPrev2.isFact = true
  postObjectPrev2.isBudget = false
  sum.Prev2 = getSum(postObjectPrev2)
  return sum
}