"use strict"

const { EventEmitter } = require('events')

const headers =  {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'OPTIONS, GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Max-Age' : 2592000
}

const eventNames = ['get', 'post', 'put', 'delete', 'options', 'default']

class AbstractController extends EventEmitter {

    constructor(req, res, content, service) {
        super()
        this.req = req
        this.res = res
        this.content = content
        this.service = service
        this.createEvents()
    }

    createEvents() {
        eventNames.forEach(event => {
            this.on(event, () => this[event]())
        })
    }

    verifyMethod() {
        const { method } = this.content

        if(eventNames.includes(method)) {
            return method
        } else {
            return 'default'
        }
    }

    get() {
        const { query } = this.content

        if(query.id) {
            const result = this.service.getOne(query.id)
            if(result) {
                this.ok()
                return this.res.end(result)
            }

            this.notFound()
            return this.res.end(
                this.returnMessage('Not found', false)
            )                    
        }

        this.ok()
        return this.res.end(this.service.getAll())
    }

    post() {
        if(this.postObject) {
            this.ok()
            return this.res.end(
                this.service.postOne(this.postObject)
            )
        }
        this.options()
        return this.res.end()
    }

    put() {
        const { body } = this.content
        const result = this.service.putOne(body)

        if(result) {
            this.ok()
            this.res.end(result)
        }

        this.notFound()
        return this.res.end(
            this.returnMessage('Not Found', false)
        )
    }

    delete() {
        const { id } = this.content.query
        const deleteResult = this.service.deleteOne(id)

        if(deleteResult) {
            this.ok()
            this.res.end(
                this.returnMessage('Successful delete!', true)
            )
        }

        this.notFound()
        this.res.end(
            this.returnMessage('Not found', false)
        )
    }

    default() {
        this.notAllowed()
        return this.res.end(
            this.returnMessage('Method Not Allowed', false)
        )
    }

    ok() {
        this.res.writeHead(200, headers)
    }

    options() {
        this.res.writeHead(204, headers)
        return this.res.end()
    }

    notAllowed() {
        this.res.writeHead(405, headers)
    }

    notFound() {
        this.res.writeHead(404, headers)
    }

    returnMessage(message, status) {
        return JSON.stringify({
            message,
            ok: status
        })
    }

    setPostObject(callback) {
        this.postObject = callback()
        this.emit(this.verifyMethod())
    }

}

module.exports = AbstractController