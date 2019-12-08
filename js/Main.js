"use strict"

import PageScript from './PageScripts/PageScripts.js'

let currentPage = null

document.querySelectorAll('[to]').forEach(anchor => {
    anchor.addEventListener('click', () => {
        const fileName = anchor.getAttribute('to')
        loadFileContent(fileName)
    })
})

async function loadFileContent(fileName) {

    if(fileName !== currentPage) {
        const main = document.querySelector('[main-content]')
        const data = await requestFileContent(fileName)
    
        main.innerHTML = data

        loadScript(fileName)
        loadCss()

        currentPage = fileName
    }
    
}

async function requestFileContent(fileName) {
    try {
        const response = await fetch(`http://localhost:5500/pages/${fileName}.html`)
        const data = await response.text()
        return data
    } catch(err) {
        throw new Error(err)
    }
}

function loadScript(fileName) {
    if(PageScript[fileName]) {
        PageScript[fileName]()
    }
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
    const query = 'link:not([href="css/index.css"])'
    document.querySelectorAll(query).forEach(tag => tag.remove())
}

(function init() {
    loadFileContent('home')
})()