"use strict"

const AbstractController = require('../src/Abstract/AbstractController')
const ItemController = require('../src/items/ItemController')

class App {

    constructor(req, res, requestContent) {
        this.req = req
        this.res = res
        this.requestContent = requestContent
        this.run()
    }

    run() {
        const { body, method, query, pathname } = this.requestContent
        const content = {body, method, query}

        switch(pathname) {
            case '/':
                return this.res.end(JSON.stringify({
                    message: 'Home'
                }))

            case '/items':
                return new ItemController(this.req, this.res, content)

            default:
                new AbstractController(this.req, this.res).notFound()
                return this.res.end(JSON.stringify({
                    message: 'Not Found',
                    ok: false
                }))
        }
    }

}

module.exports = App