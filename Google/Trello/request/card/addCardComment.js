function addCardComment(postObject, comment) {
  /*
   * @postObject - входные параметра запроса
   * @comment - текст комментария
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/actions/comments?text=' + comment + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('addCardComment: ' + e)
  }
}