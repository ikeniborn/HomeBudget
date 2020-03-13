function updateDescForNewCards(postObject) {
  try {
    var list = getList(postObject, postObject.boardIdFact)
    var cards = getCards(postObject, list.id).array
    //* обновление описание карточки
    cards.forEach(function (card) {
      var postObjectCard = JSON.parse(JSON.stringify(postObject))
      postObjectCard.cardId = card.id
      postObjectCard.cardName = card.name
      postObjectCard.cardLabelColor = card.color
      postObjectCard.accountingItem = getAccountingItem(postObjectCard)
      postObjectCard.bill = postObjectCard.accountingItem.item.bill
      postObjectCard.account = postObjectCard.accountingItem.item.account
      postObjectCard.nomenclature = card.name
      var description = getDescription(postObjectCard)
      if (description.haveBudget) {
        postObjectCard.cardDescription = description.text
        updateCardDesc(postObjectCard)
      }
    })
  } catch (e) {
    console.error('updateDescForNewCards' + e)
  }
}