"use strict"

import EventsFormActions from './eventsFormActions.js'

export default function eventsForm(id) {

    const form = document.querySelector('.add-event-form')

    const eventsFormActions = new EventsFormActions(form)

    if(id) {
        console.log('entrou')
        form.setAttribute('keyid', id)
        eventsFormActions.setEventValues(id)
    }

    form.addEventListener('submit', e => {
        e.preventDefault()
        eventsFormActions.submit(form)
    })

    document.querySelector('.btn-cancel').addEventListener('click', e => e.preventDefault())

}