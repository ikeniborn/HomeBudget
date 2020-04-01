function updateBalanceCard(postObject) {
  /*
   * @postObject - данные реквеста
   * @sumData - данные по суммам из учета
   */
  try {
    //* обновление карточки баланса
    var postObjectBalance = copyObject(postObject)
    postObjectBalance.nomenclature = 'Баланс'
    var balanceCard = getCards(postObjectBalance, postObjectBalance.listId).item
    postObjectBalance.cardId = balanceCard.id
    addCardComment(postObjectBalance)
    if (postObjectBalance.isBudget) {
      var description = getDescription(postObjectBalance)
      postObjectBalance.cardDescription = description.text
      updateCardDesc(postObjectBalance)
    }
  } catch (e) {
    postObject.error = 'updateBalanceCard: ' + e
    addError(postObject)
  }
}