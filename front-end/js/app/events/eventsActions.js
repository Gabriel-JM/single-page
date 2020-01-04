"use strict"

import HttpRequest from '../../core/http/HttpRequest.js'
import Messenger from '../../core/message/Messenger.js'
import { addRouterEvent } from '../../core/main.js'

const currentUrl = 'http://localhost:3100/events'
const eventsListQuery = 'div.events-lister'

const http = new HttpRequest(currentUrl)

export default class EventsActions {

    async update() {
        const getResult = await http.get()
        
        if(getResult.length) {
            this.displayEvents(getResult)
        } else {
            this.hasNoEvent()
        }
    }

    displayEvents(list) {
        const eventsList = document.querySelector(eventsListQuery)
        eventsList.innerHTML = ''

        list.forEach(event => {
            const div = document.createElement('div')
            div.setAttribute('keyid', event.id)
            div.className = 'event'

            div.innerHTML = `<p>${event.name}</p>`

            eventsList.appendChild(div)

            this.addEventsClick()
        })
    }

    addEventsClick() {
        document.querySelectorAll('.event').forEach(event => {
            event.addEventListener('click', () => {
                const keyId = event.getAttribute('keyid')
                
                if(keyId) {
                    this.showDescription(keyId)
                }
            })
        })
    }

    async showDescription(keyId) {
        const getResult = await http.get(keyId)
        const { id, name, dateStart, dateEnd, location } = getResult
        const { city, district, street } = location

        const dates = [new Date(dateStart), new Date(dateEnd)]

        document.querySelector('.event-name').innerHTML = `
            <h4>${name}</h4>
            <div>
                <button goTo="eventsForm" keyid="${id}" class="btn-edit" title="Edit">&#9998;</button>
                <button keyid="${id}" class="btn-delete" title="Delete">&#x2716;</button>
            </div>
        `

        document.querySelector('.event-location').innerHTML = `
        <h4>Location</h4>
        <table class="location-detail">
            <tr><td>City</td><td>${city}</td></tr>
            <tr><td>District</td><td>${district}</td></tr>
            <tr><td>Street</td><td>${street}</td></tr>
        </table>`

        document.querySelector('.event-date').innerHTML = ''

        dates.forEach((date, index) => {
            date.setTime(date.getTime() + (date.getTimezoneOffset() * 60000))
            
            const whichDate = index ? 'End Date' : 'Start Date'
            const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            const year = date.getFullYear()

            document.querySelector('.event-date').innerHTML += `${whichDate}: ${day} / ${month} / ${year}<br>`
        })

        addRouterEvent()
        this.addDeleteEvent()
    }

    addDeleteEvent() {
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const keyId = btn.getAttribute('keyid')

                this.confirmDeleteMessage(keyId)
            })
        })
    }

    confirmDeleteMessage(keyId) {

        const deleteMessageStyle = document.querySelector('.delete-event-message').style

        deleteMessageStyle.display = 'block'

        document.querySelector('[yes]').addEventListener('click', () => {
            this.deleteEvent(keyId)
            deleteMessageStyle.display = 'none'
            this.noDescription()
            this.update()
        }, false)

        document.querySelector('[no]').addEventListener('click', () => {
            deleteMessageStyle.display = 'none'
        }, false)
    }

    async deleteEvent(keyId) {
        const result = await http.delete(keyId)

        if(result.ok) {
            Messenger.showSuccess(result.message)
        } else {
            Messenger.showError(result.message)
        }
    }

    noDescription() {
        document.querySelector('.event-description').innerHTML = `
            <hgroup class="event-name"></hgroup>
            <div class="event-date">No Event.</div>
            <div class="event-location"></div>
        `
    }

    hasNoEvent() {
        this.noDescription()

        document.querySelector(eventsListQuery).innerHTML = 'No Event.'
    }

}