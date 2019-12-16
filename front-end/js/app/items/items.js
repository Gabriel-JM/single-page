"use strict"

import ItemsActions from './ItemsActions.js'

export default function items() {
    const formQuery = '.items-modal-form'
    const addItemBtn = '[add-item]'
    const cancelForm = '.btn-cancel'
    const itemsTable = '[items-table]'

    const itemsActions = new ItemsActions(itemsTable)

    itemsActions.getAll()

    document.querySelector(addItemBtn).addEventListener('click', () => {
        itemsActions.modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
        itemsActions.validateForm(event.target)
    })

    document.querySelector(cancelForm).addEventListener('click', event => {
        event.preventDefault()
        itemsActions.clearModal()
        itemsActions.modal.hide()
    })

}