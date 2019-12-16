"use strict"

class AbstractObject {

    generateId(service) {
        let result = null
        const allItems = JSON.parse(service.getAll())

        if(allItems.length) {
            const ids = allItems.map(item => item.id)

            ids.forEach(elem => {
                const index = ids.indexOf(elem)

                const existId = ids.some(id => {
                    return id == index + 1
                })

                if(!existId) {
                    result = index + 1
                }
            })
        }

        return result ? result : allItems.length + 1
    }

}

module.exports = AbstractObject