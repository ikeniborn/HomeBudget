function updateBalanceCard(postObject, sumData) {
  /*
   * @postObject - данные реквеста
   * @sumData - данные по суммам из учета
   */
  //* обновление карточки баланса
  var postObjectBalance = postObject
  postObjectBalance.nomenclature = 'Баланс'
  var balanceCard = getCards(postObjectBalance, postObjectBalance.listId).item
  postObjectBalance.cardId = balanceCard.id
  var comment = '*Остаток бюджета:* ' + sumData.totalBudget + postObjectBalance.lineBreak
  comment += '*Остаток средств:* ' + sumData.totalFact + postObjectBalance.lineBreak
  comment += '*Исполнение:* ' + (((sumData.incomeFact + sumData.expenseFact) / (sumData.incomeBudget + sumData.expenseBudget)) * 100).toFixed(2) + encodeData('%', '%')
  addCardComment(postObjectBalance, comment)
}