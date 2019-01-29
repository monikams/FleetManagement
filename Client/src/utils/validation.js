function isFieldValid(field, isValid) {
   return isValid[field];
}

function isButtonDisabled(localItem) {
   return Object.values(localItem).some(property => property === '');
}

export { isFieldValid, isButtonDisabled }