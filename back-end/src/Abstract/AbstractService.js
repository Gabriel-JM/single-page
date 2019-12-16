"use strict"

const fs = require('fs')

class AbstractService {

    constructor(filePath) {
        this.filePath = filePath
    }

    getAll() {
        let elements = null

        try {
            elements = fs.readFileSync(this.filePath, 'utf-8')
        }  catch {
            elements = '[]'
            fs.appendFileSync(this.filePath, elements)
        }

        return elements
    }

    getOne(id) {
        const list = JSON.parse(this.getAll())

        const element = list.find(elem => elem.id == id)

        return element ? JSON.stringify(element) : null
    }

    postOne(element) {
        let list = JSON.parse(this.getAll())

        list = [...list, element]

        fs.writeFileSync(this.filePath, JSON.stringify(list))

        return JSON.stringify(element)
    }

    postAll(array) {
        const list = JSON.stringify(array)

        fs.writeFileSync(this.filePath, list)

        return this.getAll()
    }

    putOne(elementToAlter) {
        const { id } = elementToAlter
        const list = JSON.parse(this.getAll())

        const theOne = list.find(elem => elem.id == id)

        if(theOne) {
            Object.keys(theOne).forEach(attr => {
                theOne[attr] = elementToAlter[attr]
            })

            return this.postAll(list)
        }

        return null
    }

    deleteOne(id) {
        const list = JSON.parse(this.getAll())

        const existsElement = list.some(elem => elem.id == id)

        if(existsElement) {
            const newList = list.filter(elem => {
                return elem.id != id
            })

            this.postAll(newList)
        }

        return existsElement
    }

}

module.exports = AbstractService