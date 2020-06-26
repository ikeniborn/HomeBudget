function sendMessageTelegram(postObject) {
  try {
    var payload = {
      method: 'sendMessage',
      chat_id: postObject.telegramChatId,
      text: postObject.cardDescription,
      parse_mode: 'HTML'
    }

    var data = {
      method: 'post',
      payload: payload
    }
    UrlFetchApp.fetch(postObject.telegramUrl, data);
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}