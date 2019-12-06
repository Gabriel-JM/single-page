import Modal from './modal/Modal.js'

const modal = new Modal()

document.querySelector('[add-item]').addEventListener('click', () => {
    modal.show()
    console.log('hi')
})

console.log(modal)