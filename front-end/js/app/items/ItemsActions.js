"use strict"

import FormManager from '../../core/form/FormManager.js'
import FormValidator from '../../core/form/FormValidator.js'
import Messenger from '../../core/message/Messenger.js'
import HttpRequest from '../../core/http/HttpRequest.js'
import Modal from '../../core/modal/Modal.js'

const currentUrl = 'http://localhost:3100/items'
const formQuery = '.items-modal-form'

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

export default class ItemsActions {

    modal = new Modal()
    itemsList = null

    constructor(tableQuery) {
        this.tableQuery = tableQuery
    }

    async getAll() {
        this.itemsList = await http.get()
        this.fillTable()
        this.addButtonsEvents()
    }

    fillTable() {
        const table = document.querySelector(this.tableQuery)

        if(this.itemsList.length) {
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
        } else {
            this.isItemsTableEmpty()
        }
    }

    addButtonsEvents() {
        const buttonsTypes = ['edit', 'delete']

        buttonsTypes.forEach(type => {
            document.querySelectorAll(`.btn-${type}`).forEach(btn => {
                btn.addEventListener('click', async event => {
                    const itemTr = event.target.parentElement.parentElement
                    const itemId = itemTr.getAttribute('keyid')

                    if(type == 'delete') {
                        this.doDelete(itemTr, itemId)
                    } else {
                        this.doEdit(itemId)
                    }
                })
            })
        })
    }

    async doEdit(id) {
        const item = await http.get(id)
        const form = document.querySelector(formQuery)

        Object.keys(item).forEach(attr => {
            const formField = form[attr]

            if(attr !== 'id') {
                formField.value = item[attr]
            } else {
                form.setAttribute('keyid', item.id)
            }
        })

        this.modal.setModalTitle('Edit item')
        this.modal.show()
    }

    async doDelete(tableRow, id) {
        const result = await http.delete(id)

        if(result.ok) {
            tableRow.remove()
            Messenger.showSuccess('Item Deleted!')
            this.getAll()
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
    
    submitForm(formManager) {
        const { elements } = formManager
        formManager.form.setAttribute('keyid', null)

        if(elements.id) {
            http.put(elements)
            Messenger.showSuccess('Success Edit!')
        } else {
            http.post(elements)
            Messenger.showSuccess('Success Create!')
        }

        this.modal.hide()
        this.clearModal()
        this.getAll()
    }

    clearModal() {
        const form = document.querySelector(formQuery)
        form.reset()
        form.setAttribute('keyid', null)
    }

    isItemsTableEmpty() {
        const table = document.querySelector(this.tableQuery)

        if(!table.innerText) {
            this.addNoItemMessage()
        }
    }

    addNoItemMessage() {
        const hasMessage = document.querySelector('.no-item-message')

        if(!hasMessage) {
            const td = document.createElement('td')
            td.setAttribute('colspan', 4)
            td.className = 'no-item-message'
            td.innerHTML = 'No item available.'

            document.querySelector(this.tableQuery).appendChild(td)
        }
    }

    removeNoItemMessage() {
        const noItemMessage = document.querySelector('.no-item-message')

        if(noItemMessage) noItemMessage.remove()
    }

}