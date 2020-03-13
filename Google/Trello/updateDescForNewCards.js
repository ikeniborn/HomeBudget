function updateDescForNewCards(postObject) {
  try {
    var list = getList(postObject, postObject.boardIdFact)
    var cards = getCards(postObject, list.id)
    //* обновление описание карточки
    cards.forEach(function (card) {
      var postObjectCard = JSON.parse(JSON.stringify(postObject))
      postObjectCard.cardId = card.id
      postObjectCard.nomenclature = card.name
      postObjectCard.bill = card.bill
      postObjectCard.account = card.account
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