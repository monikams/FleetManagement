
function isFieldValid(field, isValid) {
        return field === 'button' ? !Object.values(isValid).some(item => item === false) : isValid[field];
}

export { isFieldValid }