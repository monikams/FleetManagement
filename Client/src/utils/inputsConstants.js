const inputsPatterns = {
    bulgarianTelephoneNumbersPattern: /^(((\+359)|(0))((8[789])))\d{7}$|^(((\+359)|(0))\d{2,8}$)/,
    alphanumericsOrWhitespacePattern: /^[a-z0-9 ]+$/i,
    floatingPointNumberWithPrecissionOrInteger: /^([1-9]\d{0,2})$|^([0-9][1-9]{0,2}\.\d{1,2})$/
}

const inputsErrorMesages = {
    alphanumericsOrWhitespace: 'Alphanumeric characters and whitespace only!',
    bulgarianTelephoneNumbers: 'Bulgarian mobile or fixed telephone numbers only!',
    floatingPointNumberWithPrecissionOrInteger: 'Floating point numbers with less than 2 decimal places or integers and more or equal to 0.5 only!'
}

export {inputsPatterns, inputsErrorMesages};