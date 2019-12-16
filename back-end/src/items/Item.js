"use strict"

const ItemService = require('./ItemService')
const AbstractObject = require('../Abstract/AbstractObject')

const itemService = new ItemService()

class Item extends AbstractObject {

    constructor(name, type, description) {
        super()
        this.id = this.generateId(itemService)
        this.name = name
        this.type = type
        this.description = description
    }
    
}

module.exports = Item