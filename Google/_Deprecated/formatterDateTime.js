// форматирование даты
function formatterDateTime(date) {
  const formatter = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm')
  return formatter
}