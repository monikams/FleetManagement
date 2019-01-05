import isEmpty from 'lodash/isEmpty';

function isFieldValid(field, isValid) {
   return isValid[field];
}

function isButtonDisabled(localItem) {
   return Object.values(localItem).some(property => isEmpty(property));
}

export { isFieldValid, isButtonDisabled }