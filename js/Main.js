(function init() {
    loadFileContent('home.html')
})()

async function loadFileContent(fileName) {
    const main = document.querySelector('[main-content]')

    const response = await fetch(`http://127.0.0.1:5500/pages/${fileName}`)
    const data = await response.text()
    
    main.innerHTML = data

    loadScript()
    loadCss()
}

function loadScript() {
    const scriptFileName = document.querySelector('[script]').getAttribute('script')
    if(scriptFileName) {
        const script = document.createElement('script')
        script.src = `js/${scriptFileName}`

        document.body.appendChild(script)
    }
}

function loadCss() {
    const cssFileName = document.querySelector('[css]').getAttribute('css')
    if(cssFileName) {
        const link = document.createElement('link')
        link.rel = "stylesheet"
        link.href = `css/${cssFileName}`
    
        document.head.appendChild(link)
    }
}