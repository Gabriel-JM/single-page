"use strict"

import Modal from '../modal/Modal.js'

export default function items() {
    const modal = new Modal()

    const formQuery = '.items-modal-form'

    document.querySelector('[add-item]').addEventListener('click', () => {
        modal.show()
    })

    document.querySelector(formQuery).addEventListener('submit', event => {
        event.preventDefault()
    })

}