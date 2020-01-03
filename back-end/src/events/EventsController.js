"use strict"

const AbstractController = require('../Abstract/AbstractController')
const EventsService = require('./EventsService')
const Event = require('./Event')

const eventsService = new EventsService()

class EventsController extends AbstractController {

    constructor(req, res, content) {
        super(req, res, content, eventsService)
        this.setPostObject(() => {
            const { name, dateStart, dateEnd, location } = this.content.body
            return new Event(name, dateStart, dateEnd, location)
        })
    }

}

module.exports = EventsController