"use strict"

export default class Modal {

    query = '.modal-container'
    titleQuery = '.modal-header > h2'

    constructor() {
        this.addCloseEvent()
        this.modalContainer = document.querySelector(this.query)
    }

    show() {
        this.modalContainer.className = 'modal-container d-flex show'
    }

    hide() {
        this.modalContainer.className = 'modal-container fade'
        this.modalContainer.addEventListener('animationend', event => {
            if(event.animationName == 'fade')
            this.modalContainer.classList.add('d-none')
        })
    }

    addCloseEvent() {
        document.querySelector('.close-modal').addEventListener('click', () => this.hide())
    }

    setModalTitle(title) {
        document.querySelector(this.titleQuery).innerText = title
    }
}