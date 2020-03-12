/* eslint-disable no-undef */
function getComment(postObject) {
  try {
    var comment = {}
    var sum = getSum(postObject)
    if (postObject.isFact) {
      //* комментарий по факту
      comment.text = '**Остаток бюджета**:' + postObject.lineBreak
      comment.text += '*' + postObject.nomenclature + '*: ' + sum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
      comment.text += '*' + postObject.account + '*: ' + sum.accountBudgetRest + ' р.' + postObject.lineBreak
      comment.text += '**Остаток средств** ' + '*' + postObject.cfo + '*: ' + sum.totalRest + ' р.' + postObject.lineBreak
      if (postObject.actionType == 'commentCard') {
        comment.text += '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateСomment') {
        comment.text += '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        comment.text += '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      if (postObject.text.length !== 0) {
        comment.text += '**Комментарий**: ' + postObject.text + postObject.lineBreak
      }
    }
    if (postObject.isBudget) {
      //* комментарий по бюджету
      comment.text = '**Бюджет**:' + postObject.lineBreak
      comment.text += '*' + postObject.nomenclature + '*: ' + sum.nomenclatureSum + ' р.' + postObject.lineBreak
      comment.text += '*' + postObject.account + '*: ' + sum.accountSum + ' р.' + postObject.lineBreak
      comment.text += '*' + postObject.bill + '*: ' + sum.billSum + ' р.' + postObject.lineBreak
      if (postObject.actionType == 'commentCard') {
        comment.text += '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateСomment') {
        comment.text += '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        comment.text += '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      if (postObject.text.length !== 0) {
        comment.text += '**Комментарий**: ' + postObject.text + postObject.lineBreak

      }
    }
    return comment
  } catch (e) {
    console.error('getComment: ' + e)
  }
}