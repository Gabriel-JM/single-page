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
        const { method, body, query } = this.content

        this.ok()
        switch(method) {
            
            case 'GET':
                if(query.id) {
                    const result = itemService.getOne(query.id)
                    if(result) {
                        return this.res.end(result)
                    }

                    this.notFound()
                    return this.res.end(
                        this.returnMessage('Not found', false)
                    )                    
                }
                return this.res.end(itemService.getAll())

            case 'POST':
                const { name, type, description } = body
                const item = new Item(name, type, description)

                return this.res.end(itemService.postOne(item))

            case 'PUT':
                const result = itemService.putOne(body)

                if(result) {
                    this.res.end(result)
                }

                this.notFound()
                return this.res.end(
                    this.returnMessage('Not Found', false)
                )

            case 'DELETE':
                const { id } = query
                const deleteResult = itemService.deleteOne(id)

                if(deleteResult) {
                    this.res.end(
                        this.returnMessage('Successful delete!', true)
                    )
                }

                this.notFound()
                this.res.end(
                    this.returnMessage('Not found', false)
                )
            
            default:
                this.notAllowed()
                return this.res.end(
                    this.returnMessage('Method Not Allowed', false)
                )
        }
    }

}

module.exports = ItemController