"use strict"

import FormManager from '../../form/FormManager.js'
import FormValidator from '../../form/FormValidator.js'
import Messenger from '../../message/Messenger.js'
import HttpRequest from '../../http/HttpRequest.js'

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
        minLength: 10,
        required: true
    }
}

export default class ItemsFormActions {

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
    }

    setModal(modal) {
        this.modal = modal
    }

}