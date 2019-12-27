var token = '806168491:AAE5G1oPobTtfArA0vMOH88S9bqi1EfSrjs'; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = 'https://script.google.com/macros/s/AKfycbx1SCGWi-54aYp641yDN2v5Ux8oQh6ZQT87yFUuwaqUfivPhxI/exec'; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = '1Vuy--i4QlcSyAmQbP6OOSaaKGRSbz4sG08193FDLiwA'; // FILL IN THE ID OF YOUR SPREADSHEET

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id, text, keyboard) {

  var payload = {
    'method': 'sendMessage',
    'chat_id': String(id),
    'text': text,
    'parse_mode': 'HTML',
    'reply_markup': keyboard
  }

  var data = {
    "method": "post",
    "payload": payload
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

/*function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}*/

function doPost(e) {
  // this is where telegram works
  var data = JSON.parse(e.postData.contents);
  if (data.message) {
    var text = data.message.text;
    var id = data.message.chat.id;
    var name = data.message.chat.first_name;
  }
  if (data.callback_query) {
    var text = data.callback_query.data;
    var id = data.callback_query.message.chat.id;
    var name = data.callback_query.message.chat.first_name;
  }
  if (text == '/start') {
    var answer = 'Укажите тип расходов';
    var keyboard = JSON.stringify({
      keyboard: [
        [
          "Факт"
        ],
        [
          "Бюджет"
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }
  if (text == 'Бюджет' || text == 'Факт') {
    var answer = 'Выберите ЦФО';
    var keyboard = JSON.stringify({
      keyboard: [
        [
          "Семья"
        ],
        [
          "Оксана",
          "Илья"
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }
  if (text == 'Семья' || text == 'Оксана' || text == 'Илья') {
    var answer = 'Выберите МВЗ ';
    var keyboard = JSON.stringify({
      inline_keyboard: [
        [{
          text: "Пропустить",
          callback_data: "1_2_3_0"

        }],
        [{
            text: "Гараж",
            callback_data: "1_2_3_1"
          },
          {
            text: "Дом",
            callback_data: "1_2_3_2"
          }
        ],
        [{
            text: "Друзья",
            callback_data: "1_2_3_3"
          },
          {
            text: "Животные",
            callback_data: "1_2_3_4"
          }
        ],
        [{
            text: "Знакомые",
            callback_data: "1_2_3_5"
          },
          {
            text: "Илья",
            callback_data: "1_2_3_6"
          }
        ],
        [{
            text: "Квартира Котлярова",
            callback_data: "1_2_3_7"
          },
          {
            text: "Оксана",
            callback_data: "1_2_3_8"
          }
        ],
        [{
            text: "Родственники",
            callback_data: "1_2_3_9"
          },
          {
            text: "Семья",
            callback_data: "1_2_3_10"
          }
        ],
        [{
            text: "BMW X5",
            callback_data: "1_2_3_11"
          },
          {
            text: "Honda NC750",
            callback_data: "1_2_3_12"
          }
        ],
        [{
          text: "Yamaha FJR 1300",
          callback_data: "1_2_3_12"
        }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }
  var mvz = ['1_2_3_1', '1_2_3_2', '1_2_3_3', '1_2_3_4', '1_2_3_5', '1_2_3_6', '1_2_3_7', '1_2_3_8', '1_2_3_9', '1_2_3_10', '1_2_3_11', '1_2_3_12'];
  for (var j = 0; j < mvz.length; ++j) {
    if (text == mvz[j]) {
      var answer = 'Выберите статью ';
      var keyboard = JSON.stringify({
        inline_keyboard: [
          [{
            text: "Приход",
            callback_data: "1"

          }],
          [{
            text: "Расход",
            callback_data: "2"
          }],
          [{
            text: "Остатки",
            callback_data: "3"
          }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      })
    }
  }
  //Определение статьи прихода
  if (text == '1') {
    var answer = 'Выберите статью прихода ';
    var keyboard = JSON.stringify({
      inline_keyboard: [
        [{
            text: "Аванс",
            callback_data: "1_1"

          },
          {
            text: "Зарплата",
            callback_data: "1_2"

          }
        ],
        [{
            text: "Отпускные",
            callback_data: "1_3"
          },
          {
            text: "Подарки",
            callback_data: "1_4"
          }
        ],
        [{
            text: "Возврат",
            callback_data: "1_5"
          },
          {
            text: "Депозит",
            callback_data: "1_6"
          }
        ],
        [{
            text: "Долги",
            callback_data: "1_7"
          },
          {
            text: "Займы",
            callback_data: "1_8"
          }
        ],
        [{
            text: "Накопления",
            callback_data: "1_9"
          },
          {
            text: "Цели",
            callback_data: "1_10"
          }
        ],
        [{
            text: "Биржа",
            callback_data: "1_11"
          },
          {
            text: "ИИС",
            callback_data: "1_12"
          }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }
  //Определение статьи расхода
  if (text == '2') {
    var answer = 'Выберите статью расхода';
    var keyboard = JSON.stringify({
      inline_keyboard: [
        [{
            text: "Бензин",
            callback_data: "2_1"
          },
          {
            text: "Бытовая техника, электроника",
            callback_data: "2_2"
          }
        ],
        [{
            text: "Гипермаркет",
            callback_data: "2_3"
          },
          {
            text: "Кафе и рестораны",
            callback_data: "2_4"
          }
        ],
        [{
            text: "Коммунальные платежи",
            callback_data: "2_5"
          },
          {
            text: "Красота и здоровье",
            callback_data: "2_6"
          }
        ],
        [{
            text: "Медицина, аптека",
            callback_data: "2_7"
          },
          {
            text: "Мобильная связь, интернет, ТВ",
            callback_data: "2_8"
          }
        ],
        [{
            text: "Общественный транспорт",
            callback_data: "2_9"
          },
          {
            text: "Одежда и обувь",
            callback_data: "2_10"
          }
        ],
        [{
            text: "ПО, книги и журналы, игры, музыка, фильмы",
            callback_data: "2_11"
          },
          {
            text: "Развлечения и праздники",
            callback_data: "2_12"
          }
        ],
        [{
            text: "Ремонт и обсуживание",
            callback_data: "2_13"
          },
          {
            text: "Сигареты и табак",
            callback_data: "2_14"
          }
        ],
        [{
            text: "Столовая",
            callback_data: "2_15"
          },
          {
            text: "Штрафы, налоги, комиссии",
            callback_data: "2_16"
          }
        ],
        [{
            text: "Прочее",
            callback_data: "2_17"
          },
          {
            text: "Перевод на счет Семья",
            callback_data: "2_18"
          }
        ],
        [{
            text: "Долги",
            callback_data: "2_19"
          },
          {
            text: "Займы",
            callback_data: "2_20"
          }
        ],
        [{
            text: "Накопления",
            callback_data: "2_21"
          },
          {
            text: "Цели",
            callback_data: "2_22"
          }
        ],
        [{
            text: "Биржа",
            callback_data: "2_23"
          },
          {
            text: "Депозит",
            callback_data: "2_24"
          }
        ],
        [{
          text: "ИИС",
          callback_data: "2_25"
        }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }

  if (text == '2_22' || text == '1_10') {
    var answer = 'Выберите ТМЦ';
    var keyboard = JSON.stringify({
      inline_keyboard: [
        [{
            text: "Телефон Илья",
            callback_data: "2_22_1_10_1"

          },
          {
            text: "Татуировка Буу",
            callback_data: "2_22_1_10_2"

          }
        ],
        [{
            text: "Татуировка рукав",
            callback_data: "2_22_1_10_3"
          },
          {
            text: "Спальня",
            callback_data: "2_22_1_10_4"

          }
        ],
        [{
            text: "Отдых",
            callback_data: "2_22_1_10_5"
          },
          {
            text: "Мебель коридор",
            callback_data: "2_22_1_10_6"

          }
        ],
        [{
            text: "Детский садик",
            callback_data: "2_22_1_10_7"
          },
          {
            text: "Камин",
            callback_data: "2_22_1_10_8"

          }
        ],
        [{
            text: "Дом",
            callback_data: "2_22_1_10_9"
          },
          {
            text: "Машина",
            callback_data: "2_22_1_10_10"

          }
        ],
        [{
            text: "Пенсия",
            callback_data: "2_22_1_10_11"
          },
          {
            text: "Отдых Грузия",
            callback_data: "2_22_1_10_12"

          }
        ],
        [{
          text: "Мебель зал",
          callback_data: "2_22_1_10_13"
        }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  }
  sendText(id, answer, keyboard);
  SpreadsheetApp.openById(ssId).getSheets()[0].appendRow([new Date(), id, name, text, answer]);

  if (/^@/.test(text)) {
    var sheetName = text.slice(1).split(" ")[0];
    var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName) ? SpreadsheetApp.openById(ssId).getSheetByName(sheetName) : SpreadsheetApp.openById(ssId).insertSheet(sheetName);
    var comment = text.split(" ").slice(1).join(" ");
    sheet.appendRow([new Date(), id, name, comment, answer]);
  }
}