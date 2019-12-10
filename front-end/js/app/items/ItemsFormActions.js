"use strict"

import FormManager from '../../form/FormManager.js'
import FormValidator from '../../form/FormValidator.js'

const validationPattern = {
    name: {
        maxLength: 50,
        required: true
    },
    type: {
        maxLength: 50,
        required: true
    },
    description: {
        minLength: 10,
        required: true
    }
}

export default class ItemsFormActions {

    validateForm(form) {
        const formManager = new FormManager(form)
        const formValidator = new FormValidator(validationPattern)

        const result = formValidator.validateForm(formManager)

        console.log(result)
    }
    
    submitForm(form) {

    }

}