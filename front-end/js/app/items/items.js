"use strict"

import ItemsFormActions from './ItemsFormActions.js'

export default function items() {
    const formQuery = '.items-modal-form'
    const addItemBtn = '[add-item]'
    const cancelForm = '.btn-cancel'
    const itemsTable = '[items-table]'

    const itemsFormActions = new ItemsFormActions(itemsTable)

    itemsFormActions.init()

    document.querySelector(addItemBtn).addEventListener('click', () => {
        itemsFormActions.modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
        itemsFormActions.validateForm(event.target)
    })

    document.querySelector(cancelForm).addEventListener('click', event => {
        event.preventDefault()
        document.querySelector(formQuery).reset()
        itemsFormActions.modal.hide()
    })

}