"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'

const formPattern = {
    name: {
        maxLength: 80,
        required: true
    },
    dateStart: {
        required: true
    },
    dateEnd: {
        required: true
    },
    city: {
        maxLength: 30,
        required: true
    },
    district: {
        maxLength: 120,
        required: true
    },
    street: {
        maxLength: 140,
        required: true
    }
}

export default class EventsFormActions {

    submit(formElement) {
        this.form = new FormManager(formElement)
        const validator = new FormValidator(formPattern)
        const result = validator.validateForm(this.form)

        const date = new Date(this.form.inputs[1].value)
        date.setTime(date.getTime() + 10800000)
        console.log(date)
    }

}