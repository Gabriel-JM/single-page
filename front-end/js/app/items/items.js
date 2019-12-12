"use strict"

import Modal from '../../core/modal/Modal.js'
import ItemsFormActions from './ItemsFormActions.js'

export default function items() {
    const formQuery = '.items-modal-form'
    const addItemBtn = '[add-item]'
    const cancelForm = '.btn-cancel'
    const itemsTable = '[items-table]'

    const modal = new Modal()
    const itemsFormActions = new ItemsFormActions()

    itemsFormActions.init(itemsTable)

    document.querySelector(addItemBtn).addEventListener('click', () => {
        modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
        itemsFormActions.modal = modal
        itemsFormActions.validateForm(event.target)
    })

    document.querySelector(cancelForm).addEventListener('click', event => {
        event.preventDefault()
        document.querySelector(formQuery).reset()
        modal.hide()
    })

}