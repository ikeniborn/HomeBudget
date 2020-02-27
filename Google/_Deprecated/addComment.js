function addComment(postObject, text) {
  /*
   * @postObject - входные параметра запроса
   * @text - входной параметр текста коментария
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/actions/comments?text=' + text + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('addCheckList: ' + e)
  }
}