"use strict"

export default class FormValidator {

    constructor(obj = null) {
        this.setValidationObject(obj)
    }

    setValidationObject(obj) {
        this.validator = obj
    }

    verify(validationObj, inputObj) {
        return Object.keys(validationObj).every(attr => {
            return validationObj[attr] === inputObj[attr]
        })
    }

    verifyAll(inputsArray) {
        return Object.keys(this.validator).every(attr => {
            const input = inputsArray.find(input => input.name === attr)

            const fieldValidator = this.validator[attr]

            return Object.keys(fieldValidator).every(attr => {
                return fieldValidator[attr] === input[attr]
            })
        })
    }

    hasSpace(value) {
        const expression = /^\s*$|\s+(?=[^a-zá-úà-ù0-9])/i

        return RegExp(expression).test(value)
    }
    
    validateForm(form) {
        let message = 'ok'

        const allFieldsValidation = this.verifyAll(form.inputs)

        const spaceValidation = form.inputs.every(input => {
            return !this.hasSpace(input.value)
        })

        if (!spaceValidation) message = 'Invalid values!'

        if (!allFieldsValidation) message = "Don't do that!"

        return {
            message,
            valid: message == 'ok'
        }
    }

}