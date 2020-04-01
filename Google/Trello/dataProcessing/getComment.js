/* eslint-disable no-undef */
function getComment(postObject) {
  try {
    var comment = {}
    var sum = getSum(postObject)
    if (postObject.actionType == 'commentCard') {
      comment.text = '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (postObject.actionType == 'updateComment') {
      comment.text = '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (postObject.actionType == 'deleteComment') {
      comment.text = '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    }
    if (postObject.isFact) {
      //* комментарий по факту
      comment.text += '**Остаток средств** ' + '*' + postObject.cfo + '*: ' + sum.totalSum.totalRest + ' р.' + postObject.lineBreak
      comment.text += '**Остаток бюджета**:' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.nomenclature + ': ' + sum.totalSum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.account + ': ' + sum.totalSum.accountBudgetRest + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    } else if (postObject.isBudget) {
      //* комментарий по бюджетуы
      comment.text += '**Бюджет**:' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.nomenclature + ': ' + sum.budgetSum.nomenclatureSum + ' р.' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.account + ': ' + sum.budgetSum.accountSum + ' р.' + postObject.lineBreak
      comment.text += '*Счет* - ' + postObject.bill + ': ' + sum.budgetSum.billSum + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    }
    return comment
  } catch (e) {
    postObject.error = 'getComment: ' + e
    addError(postObject)
  }
}