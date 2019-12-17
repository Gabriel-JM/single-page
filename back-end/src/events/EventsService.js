"use strict"

const AbstractService = require('../Abstract/AbstractService')

class EventsService extends AbstractService {

    constructor() {
        super('./files/EventsList.json')
    }
}

module.exports = EventsService