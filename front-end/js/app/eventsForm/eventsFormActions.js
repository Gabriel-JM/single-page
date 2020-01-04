"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'
import Messenger from '../../core/message/Messenger.js'
import HttpRequest from '../../core/http/HttpRequest.js'
import { loadFileContent } from '../../core/main.js'

const currentUrl = 'http://localhost:3100/events'
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
const http = new HttpRequest(currentUrl)

export default class EventsFormActions {

    constructor(form) {
        this.form = new FormManager(form)
    }

    async setEventValues(keyId) {
        const getResult = await http.get(keyId)

        this.fillInputs(getResult)
    }

    fillInputs(eventObj) {
        const { location } = eventObj
        const objs = [eventObj, location]
        const { form } = this.form

        objs.forEach(obj => {
            Object.keys(obj).forEach(attr => {
                if(form[attr]) {
                    form[attr].value = obj[attr]
                    console.log(obj)
                }
            })
        })
    }

    submit() {
        this.form.elements = this.form.getValueObject()
        const validator = new FormValidator(formPattern)
        const result = validator.validateForm(this.form)

        // To work with date
        // const date = new Date(this.form.inputs[1].value)
        // date.setTime(date.getTime() + (date.getTimezoneOffset() * 60000))
        // this.form.inputs[2].valueAsDate = new Date('2020-01-02')
        
        if(result.valid) {
            console.log(this.form)
            this.save(this.form.elements)
        } else {
            Messenger.showError(result.message)
        }
    }

    save(formValue) {
        console.log(formValue)
        const { id, name, dateStart, dateEnd, city, district, street } = formValue
        const formContent = {
            id,
            name,
            dateStart,
            dateEnd,
            location: {
                city,
                district,
                street
            }
        }

        if(formContent.id) {
            http.put(formContent)
            Messenger.showSuccess('Event Edited !')
        } else {
            http.post(formContent)
            Messenger.showSuccess('Event Created !')
        }

        loadFileContent('events')
    }

}