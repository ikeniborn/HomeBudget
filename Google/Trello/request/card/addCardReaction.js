// добавление реакции в трелло
function addCardReaction(postObject) {
  /*
   * @postObject - входные параметра запроса
   */
  try {
    var reactions = []
    if (postObject.memberId == '55cb5c5729ae976dfd2b901e') {
      if (postObject.sum > 500) {
        reactions.push(postObject.scream)
      } else {
        reactions.push(postObject.buuReaction)
      }
      reactions.push(postObject.moneyBag)
    } else {
      reactions.push(postObject.moneyBag)
    }
    reactions.for(function (reaction) {
      var payload = JSON.stringify(reaction)
      var data = {
        method: 'post',
        contentType: 'application/json',
        payload: payload
      }
      UrlFetchApp.fetch(postObject.apiRoot + 'actions/' + postObject.actionId + '/reactions?' + postObject.keyAndToken, data)
    })
  } catch (e) {
    console.error('addReaction: ' + e)
  }
}