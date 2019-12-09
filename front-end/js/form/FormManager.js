"use strict"

export default class FormManager {

    constructor(form) {
        this.form = form
        this.inputs = this.getInputs()
        this.elements = this.getValueObject()
    }

    getInputs() {
        return Array.from(this.form.elements).filter(element => {
            return element.nodeName !== 'BUTTON'
        })
    }

    getValueObject() {
        const inputs = this.getInputs()

        const keyid = this.form.getAttribute('keyid')

        let values = {
            id: keyid == 'null' ? null : keyid
        }

        inputs.forEach(input => {
            Object.assign(values, {
                [input.name] : input.value
            })
        })

        return values
    }

}