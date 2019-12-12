//Получение ID элементов формы Google
function getFormID() {
  var form = FormApp.openById('17KTORM4DPwR91gKi_lcDCaVkBluTEtZQaPc5B9s-yBg');
  var items = form.getItems();
  for (var i in items) { 
    Logger.log(items[i].getTitle() + ': ' + items[i].getId());
  }
}
