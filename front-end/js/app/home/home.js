"use strict"

export default function home() {
    document.querySelector('div[home]').innerHTML = (`
        <h1 class="home-title">Wellcome to My Single Page Application.</h1>
        <p class="made-with">Made with Vanilla JS.</p>
        <p>Author: Gabriel José.</p>
        <p>
            More projects made by me in my GitHub account: 
            <a target="_blank" href="https://github.com/Gabriel-JM">
                My GitHub Account.
            </a>
        </p>
    `)
}