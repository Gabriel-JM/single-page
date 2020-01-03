"use strict"

import EventsFormActions from './eventsFormActions.js'

export default function eventsForm() {

    const eventsFormActions = new EventsFormActions()

    const form = document.querySelector('.add-event-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        eventsFormActions.submit(form)
    })

}