"use strict"

const ItemService = require('./ItemService')

const itemService = new ItemService()

class Item {

    constructor(name, type, description) {
        this.id = this.generateId()
        this.name = name
        this.type = type
        this.description = description
    }

    generateId() {
        const allItems = JSON.parse(itemService.getAll())
        const ids = allItems.map(item => item.id)

        let result = null

        ids.forEach(elem => {
            const index = ids.indexOf(elem)

            const existId = ids.some(id => {
                return id === index + 1
            })

            if(!existId) {
                result = index + 1
            }
        })

        return result ? result : ids.length + 1
    }
    
}

module.exports = Item