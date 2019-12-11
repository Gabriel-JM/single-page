"use strict"

import Modal from '../../core/modal/Modal.js'
import ItemsFormActions from './ItemsFormActions.js'

export default function items() {
    const modal = new Modal()
    const itemsFormActions = new ItemsFormActions()

    const formQuery = '.items-modal-form'

    document.querySelector('[add-item]').addEventListener('click', () => {
        modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
        itemsFormActions.modal = modal
        itemsFormActions.validateForm(event.target)
    })

    document.querySelector('.btn-cancel').addEventListener('click', event => {
        event.preventDefault()
        document.querySelector(formQuery).reset()
        modal.hide()
    })

}