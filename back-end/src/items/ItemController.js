"use strict"

const AbstractController = require('../Abstract/AbstractController')
const ItemService = require('./ItemService')
const Item = require('./Item')

const itemService = new ItemService()

class ItemController extends AbstractController {

    constructor(req, res, content) {
        super(req, res, content, itemService)
        this.setPostObject(() => {
            const { name, type, description } = this.content.body
            return new Item(name, type, description)
        })
    }

}

module.exports = ItemController