"use strict"

const fs = require('fs')

class ItemService {

    filePath = './files/ItemsList.json'

    getAll() {
        let items = null

        try {
            items = fs.readFileSync(this.filePath, 'utf-8')
        }  catch {
            items = '[]'
            fs.appendFileSync(this.filePath, '[]')
        }

        return items
    }

    getOne(id) {
        const itemsList = JSON.parse(this.getAll())

        const item = itemsList.find(item => item.id == id)

        return item ? JSON.stringify(item) : null
    }

    postOne(item) {
        let itemsList = JSON.parse(this.getAll())

        itemsList = [...itemsList, item]

        fs.writeFileSync(this.filePath, JSON.stringify(itemsList))

        return JSON.stringify(item)
    }

    postAll(itemArray) {
        const itemsList = JSON.stringify(itemArray)

        fs.writeFileSync(this.filePath, itemsList)

        return this.getAll()
    }

    putOne(itemToAlter) {
        const { id } = itemToAlter
        const itemsList = JSON.parse(this.getAll())

        const theOne = itemsList.find(item => item.id == id)

        if(theOne) {
            Object.keys(theOne).forEach(attr => {
                theOne[attr] = itemToAlter[attr]
            })

            return this.postAll(itemsList)
        }

        return null
    }

    deleteOne(id) {
        const itemsList = JSON.parse(this.getAll())

        const existsItem = itemsList.some(item => item.id == id)

        if(existsItem) {
            const newItemsList = itemsList.filter(item => {
                return item.id != id
            })

            this.postAll(newItemsList)

            return true
        } 

        return false
    }

}

module.exports = ItemService