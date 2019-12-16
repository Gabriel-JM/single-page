"use strict"

export default class Messenger {

    static showSuccess(message) {
        this.appendMessage(message, 'success')
    }

    static showError(message) {
        this.appendMessage(message, 'error')
    }

    static appendMessage(message, type) {
        const messageContainer = document.querySelector('[message-container]')

        const messageElement = this.createMessage(message, type)

        messageContainer.appendChild(messageElement)

        this.addMessagesFade()
    }

    static createMessage(message, type) {
        const div = document.createElement('div')
        div.className = 'message ' + type

        div.innerHTML = `
            <span>${type == 'error' ? '&#10008;' : '&#10004;'}</span>
            <p>${message}</p>
        `

        return div
    }

    static addMessagesFade() {
        document.querySelectorAll('.message').forEach(message => {
            message.addEventListener('animationend', () => {
                message.remove()
            })
        })
    }

}