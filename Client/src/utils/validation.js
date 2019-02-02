import omit from 'lodash/omit';

function isFieldValid(field, isValid) {
   return isValid[field];
}

function isButtonDisabled(localItem) {
   return Object.values(localItem).some(property => property === '');
}

function isServicesSaveButtonDisabled(localItem) {
   const omittedProps = localItem.BasedOn == 1 ? ['TimeRule', 'TimeReminder', 'TimeRuleEntity', 'TimeReminderEntity'] : ['MileageRule', 'MileageReminder'];        
   const result = Object.values(omit(localItem, omittedProps)).some(property => property === '');
   console.log(localItem);
   return result;
}

export { isFieldValid, isButtonDisabled, isServicesSaveButtonDisabled }