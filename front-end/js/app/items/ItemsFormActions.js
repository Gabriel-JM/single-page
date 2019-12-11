"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'
import Messenger from '../../core/message/Messenger.js'
import HttpRequest from '../../core/http/HttpRequest.js'

const currentUrl = 'http://localhost:3100/items'
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
        minLength: 5,
        required: true
    }
}

export default class ItemsFormActions {

    modal = null

    validateForm(form) {
        const formManager = new FormManager(form)
        const formValidator = new FormValidator(validationPattern)

        const result = formValidator.validateForm(formManager)

        if(result.valid) {
            this.submitForm(formManager)
        } else {       
            if(this.modal) this.modal.hide()

            Messenger.showError(result.message)
        }
    }
    
    submitForm(form) {
        const http = new HttpRequest(currentUrl)
        const { elements } = form

        if(elements.id) {
            http.put(elements)
            Messenger.showSuccess('Success Edit!')
        } else {
            http.post(elements)
            Messenger.showSuccess('Success Create!')
        }

        if(this.modal) this.modal.hide()
    }

}