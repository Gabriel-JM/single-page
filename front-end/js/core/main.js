"use strict"

import scriptService from './scriptService/scriptService.js'
import HtmlObject from '../htmlStore/HtmlObject.js'

let currentPage = null
let htmlContents = []

async function loadFileContent(fileName) {

    if(fileName !== currentPage) {
        const main = document.querySelector('[main-content]')
        const htmlFileNames = htmlContents.map(({idName}) => idName)

        main.innerHTML = await getHtmlContent(htmlFileNames, fileName)

        loadScript(fileName)
        loadCss()
        currentPage = fileName
    }
    
}

async function getHtmlContent(htmlFileNames, fileName) {
    let htmlObj = null

    if(!htmlFileNames.includes(fileName)) {
        const data = await requestFileContent(fileName)

        htmlObj = new HtmlObject(fileName, data)    

        htmlContents = [
            ...htmlContents,
            htmlObj
        ]
    } else {
        htmlObj = htmlContents.find(html => {
            return html.idName == fileName
        })
    }

    return htmlObj.htmlContent
}

async function requestFileContent(fileName) {
    const { href: host } = window.location
    try {
        const response = await fetch(`${host}pages/${fileName}.html`)
        const data = await response.text()
        return data
    } catch(err) {
        throw new Error(err)
    }
}

function loadScript(fileName) {
    if(scriptService[fileName]) {
        scriptService[fileName]()
        addRouterEvent()
    }
}

function addRouterEvent() {
    document.querySelectorAll('[goTo]').forEach(anchor => {
        anchor.addEventListener('click', () => {
            const fileName = anchor.getAttribute('goTo')
            loadFileContent(fileName)
        })
    })
}

function loadCss() {
    const cssAttribute = document.querySelector('[css]')
    if(cssAttribute) {
        optimizeStylesImports()

        const cssFileNames = cssAttribute.getAttribute('css').split(' ')
        cssFileNames.forEach(cssFileName => {
            if(cssFileName) {
                const link = document.createElement('link')
                link.rel = "stylesheet"
                link.href = `css/${cssFileName}.css`
                
                document.head.appendChild(link)
            }
        })
    }
}

function optimizeStylesImports() {
    const query = 'link[rel=stylesheet]:not([fixed])'
    document.querySelectorAll(query).forEach(tag => tag.remove())
}

(function init() {
    loadFileContent('home')
})()