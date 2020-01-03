"use strict"

const AbstractObject = require('../Abstract/AbstractObject')
const EventsService = require('./EventsService')

const eventsService = new EventsService()

class Event extends AbstractObject {

    constructor(name, dateStart, dateEnd, location) {
        super()
        this.id = this.generateId(eventsService)
        this.name = name
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.location = location
    }

}

module.exports = Event