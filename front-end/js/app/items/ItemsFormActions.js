"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'
import Messenger from '../../core/message/Messenger.js'
import HttpRequest from '../../core/http/HttpRequest.js'

const currentUrl = 'http://localhost:3100/items'

const http = new HttpRequest(currentUrl)
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


    async init(tableQuery) {
        this.itemsList = await http.get()
        this.fillTable(tableQuery)
    }

    fillTable(tableQuery) {
        const table = document.querySelector(tableQuery)
        console.log(table)

        if(this.itemsList) {
            this.itemsList.forEach(item => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.description}</td>
                    <td class="items-actions">
                        <button class="btn-edit" title="Edit">&#128393;</button>
                        <button class="btn-delete" title="Delete">&#x2716;</button>
                    </td>`

                console.log(tr)
                
                table.appendChild(tr)
            })
        }
    }

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