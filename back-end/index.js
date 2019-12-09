"use strict"

const Http = require('http')
const Url = require('url')
const App = require('./app/app')

const port = process.env.PORT || 3100

const server = Http.createServer((req, res) => {
    const { url, method } = req
    const { pathname, query } = Url.parse(url, true)

    let body = []

    req.on('error', err => {
        throw new Error(err)
    }).on('data', chunck => {
        body = [...body, chunck]
    }).on('end', () => {
        body = Buffer.concat(body).toString()

        if(body) {
            body = JSON.parse(body)
        }

        const content = {
            body, method, pathname, query
        }

        new App(req, res, content)
    })
})

server.listen(port, () => console.log('Server On. Port: ' + port))