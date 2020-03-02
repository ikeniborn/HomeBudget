function addCardComment(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @comment - текст комментария
   */
  try {
    var data = {
      method: 'post',
      contentType: 'application/json'
    }
    UrlFetchApp.fetch(postObject.apiRoot + 'cards/' + postObject.cardId + '/actions/comments?text=' + postObject.cardComment + '&' + postObject.keyAndToken, data)
  } catch (e) {
    console.error('addCardComment: ' + e)
  }
}