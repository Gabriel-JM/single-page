"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'
import Messenger from '../../core/message/Messenger.js'
import HttpRequest from '../../core/http/HttpRequest.js'
import Modal from '../../core/modal/Modal.js'

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

    modal = new Modal()
    itemsList = null

    constructor(tableQuery) {
        this.tableQuery = tableQuery
    }

    async init() {
        this.itemsList = await http.get()
        this.fillTable()
    }

    fillTable() {
        const table = document.querySelector(this.tableQuery)

        if(this.itemsList) {
            table.innerHTML = ''

            this.itemsList.forEach(item => {
                const tr = document.createElement('tr')
                tr.setAttribute('keyid', item.id)

                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.description}</td>
                    <td class="items-actions">
                        <button class="btn-edit" title="Edit">&#9998;</button>
                        <button class="btn-delete" title="Delete">&#x2716;</button>
                    </td>
                `
                
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

        this.modal.hide()
        this.init()
    }

}