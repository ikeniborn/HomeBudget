function getPreviousFact(postObject) {
  var sum = {}
  var postObjectPrev1 = postObject
  postObjectPrev1.period = postObject.factPeriod
  postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
  postObjectPrev1.isFact = true
  postObjectPrev1.isBudget = false
  sum.Prev1 = getSum(postObjectPrev1)
  var postObjectPrev2 = postObject
  postObjectPrev2.period = postObject.factPeriod0
  postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
  postObjectPrev2.isFact = true
  postObjectPrev2.isBudget = false
  sum.Prev2 = getSum(postObjectPrev2)
  return sum
}