"use strict"

const AbstractObject = require('../Abstract/AbstractObject')
const EventsService = require('./EventsService')

const eventsService = new EventsService()

class Event extends AbstractObject {

    constructor(name, dateInit, dateEnd, location) {
        super()
        this.id = this.generateId(eventsService)
        this.name = name
        this.dateInit = dateInit
        this.dateEnd = dateEnd
        this.location = location
    }

}

module.exports = Event