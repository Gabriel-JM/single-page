"use strict"

export default class Modal {

    #query = '.modal-container'

    constructor() {
        this.addCloseEvent()
    }

    show() {
        document.querySelector(this.#query).style.display = 'flex'
    }

    hide() {
        document.querySelector(this.#query).style.display = 'none'
    }

    addCloseEvent() {
        document.querySelector('.close-modal').addEventListener('click', () => this.hide())
    }
}