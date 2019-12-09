"use strict"

const AbstractController = require('../Abstract/AbstractController')
const ItemService = require('./ItemService')
const Item = require('./Item')

const itemService = new ItemService()

class ItemController extends AbstractController {

    constructor(req, res, content) {
        super(req, res)
        this.content = content
        this.run()
    }

    run() {
        const { method, body } = this.content

        this.ok()
        switch(method) {
            
            case 'GET':
                return this.res.end(itemService.getAll())

            case 'POST':
                const { name, type, description } = body
                const item = new Item(name, type, description)

                return this.res.end(itemService.postOne(item))
            
            default:
                this.notAllowed()
                return this.res.end(JSON.stringify({
                    message: "Method Not Allowed",
                    ok: false
                }))
        }
    }

}

module.exports = ItemController