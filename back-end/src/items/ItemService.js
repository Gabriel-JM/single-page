"use strict"

const AbstractService = require('../Abstract/AbstractService')

class ItemService extends AbstractService {

    constructor() {
        super('./files/ItemsList.json')
    }

}

module.exports = ItemService