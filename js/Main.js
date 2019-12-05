(function init() {
    loadFileContent('home.html')
})()

async function loadFileContent(fileName) {
    const main = document.querySelector('[main-content]')

    const response = await fetch(`http://localhost:5500/pages/${fileName}`)
    const data = await response.text()
    
    main.innerHTML = data

    loadScript()
    loadCss()
}

function loadScript() {
    const scriptAttribute = document.querySelector('[script]')
    if(scriptAttribute) {
        const scriptFileName = scriptAttribute.getAttribute('script')
        const script = document.createElement('script')
        script.src = `js/${scriptFileName}`

        optimizeCodes()
        document.body.appendChild(script)
    }
}

function loadCss() {
    const cssAttribute = document.querySelector('[css]')
    if(cssAttribute) {
        const cssFileName = cssAttribute.getAttribute('css')
        const link = document.createElement('link')
        link.rel = "stylesheet"
        link.href = `css/${cssFileName}`
    
        optimizeStyles()
        document.head.appendChild(link)
    }
}

function optimizeCodes() {
    document.querySelectorAll('script').forEach(script => {
        const file = script.getAttribute('src')
        if(file !== 'js/Main.js') {
            script.remove()
        }
    })
}

function optimizeStyles() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(tag => {
        const file = tag.getAttribute('href')
        if(file !== 'css/index.css') {
            tag.remove()
        }
    })
}