// добавление реакции в трелло
function addReaction(globalVar, postObject) {
  try {
    var reactions = []
    if (postObject.memberId == '55cb5c5729ae976dfd2b901e') {
      if (postObject.sum > 500) {
        reactions.push(globalVar.scream)
      } else {
        reactions.push(globalVar.buuReaction)
      }
      reactions.push(globalVar.moneyBag)
    } else {
      reactions.push(globalVar.moneyBag)
    }
    reactions.forEach(function (reaction) {
      var payload = JSON.stringify(reaction)
      var data = {
        method: 'post',
        contentType: 'application/json',
        payload: payload
      }
      UrlFetchApp.fetch(globalVar.apiRoot + 'actions/' + postObject.actionId + '/reactions?' + globalVar.keyAndToken, data)
    })
  } catch (e) {
    console.error('addReaction: ' + e)
  } finally {
    console.log('addReaction: complete')
  }
}