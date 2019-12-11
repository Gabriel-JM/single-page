"use strict"

export default class HttpRequest {

    constructor(url) {
        this.url = url
    }

    async get(id = null) {
        const url = id ? `${this.url}?id=${id}` : this.url

        return await this.makeRequest(url, 'GET')

    }

    async post(bodyContent) {
        return await this.makeRequest(this.url, 'POST', bodyContent)
    }

    async put(bodyContent) {
        return await this.makeRequest(this.url, 'PUT', bodyContent)
    }

    async delete(id) {
        const url = `${this.url}?id=${id}`

        return await this.makeRequest(url, 'DELETE')
    }

    async makeRequest(url, method, bodyContent = null) {
        const headers = {
            method,
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        if(bodyContent) {
            Object.assign(headers, {
                body: JSON.stringify(bodyContent)
            })
        }

        try {
            const response = await fetch(url, headers)

            const data = await response.json()

            return data
        } catch(error) {
            throw new Error(error)
        }
    }

}