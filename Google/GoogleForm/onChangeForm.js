function onChangeForm() {
  //  var periodFactValues = getArrayParametrValue(sourceSheetID,parametrSheetName,['factPeriod','factPeriod-1']);  // Обновляем список периода
  //  var periodBudgetValues = getArrayParametrValue(sourceSheetID,parametrSheetName,['budgetPeriod','budgetPeriod+1','budgetPeriod+2']);  // Обновляем список периода бюджета
  var costValues = getAccountingItemNomenclature(sourceSheetID, accountingItemSheetName); // Обновляем список номенклатура
  var mvzValues = getCostСenterAlias(sourceSheetID, costСenterSheetName); // Обновляем список мвз
  console.log(periodBudgetValues)
  //Обновление формы факта
  var formfact = FormApp.openById('18gbQSPxekQj1Nt5F2MMLkjAJP0l00c98_aCUFRQiABs');
  //  formfact.getItemById(1728718507).asMultipleChoiceItem().setChoiceValues(periodFactValues); 
  formfact.getItemById(1777323006).asListItem().setChoiceValues(costValues);
  formfact.getItemById(1357540560).asListItem().setChoiceValues(mvzValues);
  //Обновление формы бюджета
  var formbudget = FormApp.openById('17KTORM4DPwR91gKi_lcDCaVkBluTEtZQaPc5B9s-yBg');
  //  formbudget.getItemById(1728718507).asMultipleChoiceItem().setChoiceValues(periodBudgetValues); 
  formbudget.getItemById(1777323006).asListItem().setChoiceValues(costValues);
  formbudget.getItemById(1593862911).asListItem().setChoiceValues(mvzValues);
  var formtarget = FormApp.openById('1Y_TtJ6mvc9M4KuBJ7dzAH3ZHw_mhWVjbm8xSx4XCx48');
  formtarget.getItemById(2068343724).asMultipleChoiceItem().setChoiceValues(periodFactValues);

}