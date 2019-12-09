"use strict"

import Modal from '../modal/Modal.js'
import FormManager from '../form/FormManager.js'

export default function items() {
    const modal = new Modal()

    const formQuery = '.items-modal-form'

    document.querySelector('[add-item]').addEventListener('click', () => {
        modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
        const form = event.target
        const formManager = new FormManager(form)
        const item = {
            id: null,
            name: form.name.value,
            type: form.type.value,
            description: form.description.value
        }

        console.log(formManager)
    })

    document.querySelector('.btn-cancel').addEventListener('click', event => {
        event.preventDefault()
        document.querySelector(formQuery).reset()
        modal.hide()
    })

}