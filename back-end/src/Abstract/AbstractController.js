"use strict"

const headers =  {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'OPTIONS, GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Max-Age' : 2592000
}

class AbstractController {

    constructor(req, res) {
        this.req = req
        this.res = res
    }

    ok() {
        this.res.writeHead(200, headers)
    }

    options() {
        this.res.writeHead(204, headers)
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

}

module.exports = AbstractController