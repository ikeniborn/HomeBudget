// форматирование даты
function formatterDate(date) {
  const formatter = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy')
  return formatter
}