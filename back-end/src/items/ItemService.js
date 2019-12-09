"use strict"

const fs = require('fs')

class ItemService {

    filePath = './files/ItemsList.json'

    getAll() {
        const items = fs.readFileSync(this.filePath)

        return items
    }

    postOne(item) {
        let itemsList = JSON.parse(this.getAll())

        itemsList = [...itemsList, item]

        fs.writeFileSync(this.filePath, JSON.stringify(itemsList))

        return JSON.stringify(item)
    }

}

module.exports = ItemService